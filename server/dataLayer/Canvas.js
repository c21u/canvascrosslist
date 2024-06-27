import CanvasLmsApi from "canvas-lms-api";
import { canvas as config } from "../config.js";
import PQueue from "p-queue";

const CanvasApi = new CanvasLmsApi(config.lmsApiUrl, {
  accessToken: config.token,
});

const Canvas = {};

const queue = new PQueue({ concurrency: 50 });

Canvas.getCourses = async (userId) => {
  console.log(userId);
  return CanvasApi.get(`users/${userId}/courses`, {
    include: ["term", "sections"],
    enrollment_role: "TeacherEnrollment",
    enrollment_state: "active",
    exclude_blueprint_courses: true,
  })
    .then((coursesData) => {
      // console.log(courses);
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

Canvas.crossListSection = async (targetId, sectionId, userId, gtAccount) => {
  console.log("running cross list section");
  console.log(targetId, sectionId, userId, gtAccount);
  return CanvasApi.post(`sections/${sectionId}/crosslist/${targetId}`, {
    as_user_id: userId,
  })
    .then((res) => {
      console.log(res);
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

Canvas.unCrossListSection = async (sectionId, userId, gtAccount) => {
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

export default Canvas;
