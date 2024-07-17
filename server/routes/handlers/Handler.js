import CanvasLmsApi from "canvas-lms-api";
import { canvas as config } from "../../config.js";
import PQueue from "p-queue";
import superagent from "superagent";
import parseLinkHeader from "parse-link-header";

import BuzzAPI from "buzzapi";
import { buzzAPI as cfg } from "../../config.js";

const buzzApi = new BuzzAPI(cfg);

const handleErrors = (err) => {
  return err;
};

const tokenPlugin = (req) => {
  req.set("Authorization", `Bearer ${config.token}`);
};

const responseBodyAndLinks = (res) => {
  const linkHeader = res.header.link;
  const links = parseLinkHeader(linkHeader);
  return {
    body: res.body,
    links,
  };
};

const rawReq = {
  get: (url) =>
    superagent
      .get(`${config.lmsApiUrl}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBodyAndLinks),
  post: (url, data) =>
    superagent
      .post(`${config.lmsApiUrl}${url}`)
      .send(data)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBodyAndLinks),
};

const CanvasApi = new CanvasLmsApi(config.lmsApiUrl, {
  accessToken: config.token,
});

const Handler = {};

const queue = new PQueue({ concurrency: 50 });

Handler.getCourses = async (userId) => {
  return CanvasApi.get(`users/${userId}/courses`, {
    include: ["term", "sections"],
    enrollment_role: "TeacherEnrollment",
    enrollment_state: "active",
    exclude_blueprint_courses: true,
  })
    .then((coursesData) => {
      return Array.isArray(coursesData) ? coursesData : [coursesData];
    })
    .then((theCourses) => {
      const courseActivity = theCourses.map((course) => () => {
        const updatedCourse = course;
        updatedCourse.recent_students = 0;
        return updatedCourse;
      });
      return queue.addAll(courseActivity).then(() => theCourses);
    })
    .then((coursesData) => {
      const sections = coursesData.map(
        (course) => () => CanvasApi.get(`courses/${course.id}/sections`)
      );
      return queue.addAll(sections).then((sectionsData) => ({
        coursesData,
        sectionsData,
      }));
    })
    .then(({ coursesData, sectionsData }) => {
      const sectionMap = {};
      sectionsData.map((sectionLists) =>
        sectionLists.map((section) => {
          if (section && !sectionMap[section.id]) {
            sectionMap[section.id] = {
              nonxlist_course_id: section.nonxlist_course_id,
              sisSectionId: section.sis_section_id,
            };
          }
          return section;
        })
      );
      return { coursesData, sectionMap };
    })
    .then(({ coursesData, sectionMap }) =>
      coursesData.map((courseData) => {
        const updatedCourseData = courseData;
        updatedCourseData.sections = updatedCourseData.sections.map(
          (section) => {
            const updatedSection = section;
            updatedSection.nonxlist_course_id =
              sectionMap[updatedSection.id].nonxlist_course_id;
            updatedSection.sisSectionId =
              sectionMap[updatedSection.id].sisSectionId;
            return updatedSection;
          }
        );
        return updatedCourseData;
      })
    )
    .then((data) =>
      Array.isArray(data)
        ? data.filter((course) => course.sis_course_id)
        : [data]
    )
    .catch((err) => {
      console.log(err);
    });
};

Handler.crossListSection = async (targetId, sectionId, userId, gtAccount) => {
  return CanvasApi.post(`sections/${sectionId}/crosslist/${targetId}`, {
    as_user_id: userId,
  })
    .then((res) => {
      return {
        action: "crosslist",
        user: userId,
        gtAccount,
        section: sectionId,
        course: targetId,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

Handler.unCrossListSection = async (sectionId, userId, gtAccount) => {
  return CanvasApi.get(`sections/${sectionId}/enrollments`, {
    as_user_id: userId,
    type: "TeacherEnrollment",
  })
    .then((enrollments) => {
      if (
        enrollments
          .map((enrollment) => `${enrollment.user_id}`)
          .includes(userId)
      ) {
        return CanvasApi.delete(`sections/${sectionId}/crosslist`).then(
          (section) => {
            console.log({
              action: "uncrosslist",
              user: userId,
              gtAccount,
              section: sectionId,
            });
            return section;
          }
        );
      }
      return CanvasApi.get("accounts/self/admins", { user_id: [userId] }).then(
        (admins) => {
          if (admins.length > 0) {
            return CanvasApi.delete(`sections/${sectionId}/crosslist`).then(
              (section) => {
                console.log({
                  action: "uncrosslist",
                  user: userId,
                  gtAccount,
                  section: sectionId,
                });
                return section;
              }
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const listSisUserIds = async (termCode, crn) => {
  const query =
    "query ($courseId: String) { course(sisId: $courseId) { usersConnection { nodes { sisId } } } }";
  const variables = { courseId: `${termCode}/${crn}` };
  try {
    const result = await rawReq.post("/api/graphql", { query, variables });
    return result.body.data.course.usersConnection.nodes.map(
      (user) => user.sisId
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

Handler.isolateSection = async (termCode, crn, action) => {
  // action can either be "create or "delete"
  listSisUserIds(termCode, crn).then(async (sisUserIds) => {
    return buzzApi
      .post("central.academics.sis.section_attributes", action, {
        term_code: termCode,
        crn: crn,
        attr_code: "ISOL",
      })
      .then(() => {
        console.log(
          `${
            action == "delete" ? "Unisolated" : "Isolated"
          } section ${termCode}/${crn}`
        );
        const payload = sisUserIds.join("|");
        return buzzApi.post("central.iam.queues.work_items", "create", {
          system_name: "canvas",
          feed_name: "gted",
          id_type: "gtid",
          id: payload,
          source: "section-isolation",
          reason: "Refresh users in isolated section.",
        });
      })
      .then(() => {
        console.log(
          `Created batch update work items for ${sisUserIds.length} user(s).`
        );
        return {
          status: "success",
          data: { isolatedSection: { termCode, crn } },
        };
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

Handler.checkSectionIsolation = async (termCode, crn) => {
  return buzzApi
    .post("central.academics.sis.section_attributes", "read", {
      term_code: termCode,
      crn: crn,
      attr_code: "ISOL",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Handler;
