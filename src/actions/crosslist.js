import {
  GET_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_DONE,
  GET_COURSE,
  GET_COURSE_FAIL,
  GET_COURSE_DONE,
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  XLIST_SECTION_FAIL,
  UNXLIST_SECTION_DONE,
  UNXLIST_SECTION_FAIL,
} from '../constants';

export function getCoursesDone(terms, courses, sections) {
  return { type: GET_COURSES_DONE, payload: { terms, courses, sections } };
}

export function getCoursesFail(errors) {
  return { type: GET_COURSES_FAIL, payload: errors };
}

export function getCourses() {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({ type: GET_COURSES });
    try {
      const { data } = await graphqlRequest(
        '{courses{id,name,sis_course_id,course_code,term{id, name, end_at},sections{id,name,nonxlist_course_id},recent_students}}',
      );
      if (!data || !data.courses) {
        dispatch(
          getCoursesFail([
            { key: 'general', message: 'Failed to load the course feed.' },
          ]),
        );
      }
      // Normalize the canvas data
      const terms = { byId: {}, allIds: [] };
      const courses = { byId: {}, allIds: [] };
      const sections = { byId: {}, allIds: [] };
      data.courses.forEach(course => {
        courses.byId[course.id] = {
          name: course.name,
          course_code: course.course_code,
          recent_students: course.recent_students,
          sis_course_id: course.sis_course_id,
          sections: course.sections.map(section => section.id),
        };
        courses.allIds.push(course.id);
        course.sections.map(section => {
          sections.byId[section.id] = {
            name: section.name,
            nonxlist_course_id: section.nonxlist_course_id
              ? section.nonxlist_course_id
              : course.id,
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
      dispatch(getCoursesDone(terms, courses, sections));
    } catch (e) {
      const errors = [
        {
          key: 'general',
          message: e,
        },
      ];
      dispatch(getCoursesFail(errors));
    }
  };
}

export function getCourseDone(courseId, termId, course) {
  return {
    type: GET_COURSE_DONE,
    payload: {
      courseId,
      termId,
      course,
    },
  };
}

export function getCourseFail(errors) {
  return { type: GET_COURSE_FAIL, payload: errors };
}

export function getCourse(courseId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({ type: GET_COURSE, payload: { courseId } });
    try {
      const { data } = await graphqlRequest(
        `{courses(courseId: ${courseId}){name,course_code,sis_course_id,term{id},sections{id}}}`,
      );
      if (!data) {
        dispatch(
          getCourseFail([
            { key: 'general', message: 'Failed to fetch course.' },
          ]),
        );
      }
      const course = {
        name: data.courses[0].name,
        course_code: data.courses[0].course_code,
        sis_course_id: data.courses[0].sis_course_id,
        sections: data.courses[0].sections.map(section => section.id),
      };
      dispatch(getCourseDone(courseId, data.courses[0].term.id, course));
    } catch (e) {
      const errors = [
        {
          key: 'general',
          message: e,
        },
      ];
      dispatch(getCourseFail(errors));
    }
  };
}

export function setCrosslistTarget({ termId, courseId }) {
  return {
    type: SET_XLIST_TARGET,
    payload: {
      termId,
      courseId,
    },
  };
}

export function crosslistSectionDone(sectionId, courseId) {
  return {
    type: XLIST_SECTION_DONE,
    payload: {
      sectionId,
      courseId,
    },
  };
}

export function crosslistSectionFail(errors) {
  return { type: XLIST_SECTION_FAIL, payload: errors };
}

export function crosslistSection({ sectionId, recentStudentsCount }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    /* Prompt for confirmation if the course that the section-to-be-crosslisted
    is in, has any count of recent_students in the course. Otherwise, go on. */
    const shouldContinue =
      recentStudentsCount > 0
        ? // eslint-disable-next-line no-alert
          window.confirm(
            `Are you sure you want to move this section? Data loss could result.`,
          )
        : true;
    if (shouldContinue) {
      const courseId = getState().crosslist.target;
      dispatch({ type: XLIST_SECTION, payload: { sectionId } });
      try {
        const { data } = await graphqlRequest(
          `mutation {crosslistCourse(sectionId: ${sectionId}, targetId: ${courseId}){course_id}}`,
        );
        if (!data) {
          dispatch(
            crosslistSectionFail([
              { key: 'general', message: 'Failed to crosslist.' },
            ]),
          );
        }
        dispatch(crosslistSectionDone(sectionId, courseId));
      } catch (e) {
        const errors = [
          {
            key: 'general',
            message: e,
          },
        ];
        dispatch(crosslistSectionFail(errors));
      }
    }
  };
}

export function uncrosslistSectionDone(sectionId, courseId) {
  return {
    type: UNXLIST_SECTION_DONE,
    payload: {
      sectionId,
      courseId,
    },
  };
}

export function uncrosslistSectionFail(errors) {
  return { type: UNXLIST_SECTION_FAIL, payload: errors };
}

export function uncrosslistSection({ sectionId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({ type: UNXLIST_SECTION, payload: { sectionId } });
    try {
      const { data } = await graphqlRequest(
        `mutation {unCrosslistCourse(sectionId: ${sectionId}){course_id}}`,
      );
      if (!data) {
        dispatch(
          uncrosslistSectionFail([
            {
              key: 'general',
              message: `Failed to uncrosslist.`,
            },
          ]),
        );
      }

      const courseId = data.unCrosslistCourse.course_id;
      if (!getState().crosslist.courses.byId[courseId]) {
        await dispatch(getCourse(courseId));
      }

      dispatch(uncrosslistSectionDone(sectionId, courseId));
    } catch (e) {
      const errors = [
        {
          key: 'general',
          message: e,
        },
      ];
      dispatch(uncrosslistSectionFail(errors));
    }
  };
}
