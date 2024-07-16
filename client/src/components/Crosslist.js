/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Spinner } from "@instructure/ui-spinner";
import { Link } from "react-router-dom";
import "./styles.css";
import agent from "../agent.js";
import Course from "./Course.js";

const Crosslist = () => {
  const [state, setState] = useState({
    coursesLoading: true,
    courses: {},
    terms: {},
    sections: {},
    target: null,
    available: [],
    pending: [],
  });

  useEffect(() => {
    console.log("Running api call!");
    agent.courses
      .get()
      .then((data) => {
        if (!data) {
          return {
            error: `No courses found for user_id ${data.userId}`,
          };
        }
        const terms = { byId: {}, allIds: [] };
        const courses = { byId: {}, allIds: [] };
        const sections = { byId: {}, allIds: [] };
        data.courses.forEach((course) => {
          courses.byId[course.id] = {
            name: course.name,
            course_code: course.course_code,
            recent_students: course.recent_students,
            sis_course_id: course.sis_course_id,
            sections: course.sections.map((section) => section.id),
          };
          courses.allIds.push(course.id);
          course.sections.map((section) => {
            sections.byId[section.id] = {
              name: section.name,
              nonxlist_course_id: section.nonxlist_course_id
                ? section.nonxlist_course_id
                : course.id,
              sisSectionId: section.sisSectionId,
            };
            return sections.allIds.push(section.id);
          });
          if (terms.byId[course.term.id]) {
            terms.byId[course.term.id].courses.push(course.id);
          } else {
            terms.byId[course.term.id] = {
              name: course.term.name,
              courses: [course.id],
              end_at: new Date(course.term.end_at),
            };
            terms.allIds.push(course.term.id);
          }
        });
        setState((state) => {
          return {
            ...state,
            courses,
            terms,
            sections,
            coursesLoading: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setCrossListTarget = (termId, courseId) => {
    setState((state) => {
      return {
        ...state,
        target: courseId,
        available: state.terms.byId[termId].courses
          .map((course) =>
            course === courseId ? [] : state.courses.byId[course].sections
          )
          .reduce((acc, cur) => acc.concat(cur)),
      };
    });
  };

  const crossListSection = (sectionId) => {
    const sectionFilter = (id) => sectionId !== id;
    setState((state) => {
      return {
        ...state,
        available: state.available.filter(sectionFilter),
        pending: [...state.pending, sectionId],
        newProperty: "Hello!!",
        courses: {
          ...state.courses,
          byId: Object.entries(state.courses.byId)
            .map(([key, value]) => [
              key,
              {
                ...value,
                ...(key == state.target ? { saveState: "saving" } : null),
                sections:
                  key == state.target
                    ? [...state.courses.byId[state.target].sections, sectionId]
                    : value.sections.filter(sectionFilter),
              },
            ])
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
        },
      };
    });
    const courseId = state.target;
    crossListSectionDone(sectionId, courseId);
    agent.courses
      .crosslist({ courseId, sectionId })
      .then((res) => {
        crossListSectionDone(sectionId, courseId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const crossListSectionDone = (sectionId) => {
    setState((state) => {
      return {
        ...state,
        pending: state.pending.filter((id) => sectionId !== id),
        courses: {
          ...state.courses,
          byId: Object.entries(state.courses.byId)
            .map(([key, value]) => [
              key,
              {
                ...value,
                ...(value.sections.includes(sectionId)
                  ? { saveState: "saved" }
                  : null),
              },
            ])
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
        },
      };
    });
  };

  const unCrossListSection = (sectionId) => {
    setState((state) => {
      return {
        ...state,
        pending: [...state.pending, sectionId],
      };
    });
    agent.courses
      .uncrosslist({ sectionId })
      .then((res) => {
        console.log("uncrosslist response!");
        console.log(res);
        const courseId = res.course_id;
        uncrosslistSectionDone(sectionId, courseId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uncrosslistSectionDone = (sectionId, courseId) => {
    const sectionFilter = (id) => sectionId !== id;
    setState((state) => {
      return {
        ...state,
        pending: state.pending.filter((id) => sectionId !== id),
        available: [...state.available, sectionId],
        courses: {
          ...state.courses,
          byId: {
            ...Object.entries(state.courses.byId)
              .map(([key, value]) => {
                if (key == courseId) {
                  return [
                    key,
                    {
                      ...value,
                      saveState: "saved",
                      sections: value.sections.includes(sectionId)
                        ? value.sections
                        : [...value.sections, sectionId],
                    },
                  ];
                }
                return [
                  key,
                  {
                    ...value,
                    ...(value.sections.includes(sectionId)
                      ? { saveState: "saved" }
                      : null),
                    sections: value.sections.filter(sectionFilter),
                  },
                ];
              })
              .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
          },
        },
      };
    });
  };

  return (
    <View as="div">
      <View as="div" margin="none none medium none">
        <h1 className="crosslistTitle">Combine Courses</h1>
      </View>
      <View as="div">
        <Text size="large" color="danger" weight="bold">
          Warning:
        </Text>
      </View>
      <ul>
        <li>
          If you choose to combine courses, please start with your largest
          projected section as the primary course section, i.e. the one you
          "manage". Course materials and grades technically reside within this
          section and it is important to structure your combined courses in this
          way.
        </li>
        <li>
          Do not combine sections if students have already submitted work in one
          of your sections. Coursework is retained with the course, not with the
          section enrollments. So if a section is combined with a section in
          another course, all enrollments will lose any associated assignment
          submissions and grades.
        </li>
        <li>Sections can only be in one course at a time.</li>
        <li>
          Once a section is combined with another section, you can separate the
          section back out. This will return it to its original course.
        </li>
        <li>
          You can rename your combined course by navigating to your course in
          Canvas, clicking "Settings" in the course navigation along the left,
          then making sure the "Course Details" tab is selected at the top.
        </li>
      </ul>
      <View as="div" margin="none none medium none">
        <Text>
          If you would like to isolate your sections, send your request to{" "}
          <Link to="mailto:canvas@gatech.edu" className="linkStyle">
            canvas@gatech.edu
          </Link>
          .
        </Text>
      </View>
      {state.coursesLoading ? (
        <View as="div" margin="none none medium none" textAlign="center">
          <Text>
            <Spinner size="small" renderTitle="Loading" margin="0 0 0 medium" />
          </Text>
        </View>
      ) : (
        <View as="div" margin="none none medium none">
          {state.terms.allIds
            .sort(
              (a, b) => state.terms.byId[a].end_at - state.terms.byId[b].end_at
            )
            .map((termId) => (
              <View as="div" key={termId}>
                <View as="div" className="termsTitle">
                  <h1>{state.terms.byId[termId].name}</h1>
                </View>
                {state.terms.byId[termId].courses
                  .filter(
                    (courseId) =>
                      state.courses.byId[courseId].sections.length > 0
                  )
                  .sort((a, b) =>
                    state.courses.byId[a].name.localeCompare(
                      state.courses.byId[b].name
                    )
                  )
                  .map((courseId) => (
                    <Course
                      key={courseId}
                      courseId={courseId}
                      course={state.courses.byId[courseId]}
                      termCode={state.courses.byId[
                        courseId
                      ].sis_course_id.substring(
                        0,
                        state.courses.byId[courseId].sis_course_id.indexOf("/")
                      )}
                      crn={state.courses.byId[courseId].sis_course_id.substring(
                        state.courses.byId[courseId].sis_course_id.indexOf(
                          "/"
                        ) + 1
                      )}
                      crossListSection={crossListSection}
                      unCrossListSection={unCrossListSection}
                      setCrossListTarget={() =>
                        setCrossListTarget(termId, courseId)
                      }
                      isTarget={state.target === courseId}
                      targetExists={!!state.target}
                      pending={state.pending}
                      available={state.available}
                      sections={state.sections}
                    />
                  ))}
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default Crosslist;
