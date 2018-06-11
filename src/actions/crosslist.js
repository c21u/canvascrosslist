import {
  GET_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_DONE,
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  XLIST_SECTION_FAIL,
  UNXLIST_SECTION_DONE,
  UNXLIST_SECTION_FAIL,
} from '../constants';

export function getCoursesDone(courses) {
  return { type: GET_COURSES_DONE, payload: { courses } };
}

export function getCoursesFail(errors) {
  return { type: GET_COURSES_FAIL, payload: errors };
}

export function getCourses() {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch(() => ({ type: GET_COURSES }));
    try {
      const { data } = await graphqlRequest(
        '{courses{id,name,sis_course_id,course_code,term{id, name},sections{id,name}}}',
      );
      if (!data || !data.courses)
        dispatch(
          getCoursesFail([
            { key: 'general', message: 'Failed to load the course feed.' },
          ]),
        );
      const coursesByTerm = {};
      data.courses.forEach(course => {
        if (coursesByTerm[course.term.id]) {
          coursesByTerm[course.term.id].push(course);
        } else {
          coursesByTerm[course.term.id] = [course];
        }
      });
      dispatch(
        getCoursesDone(
          Object.values(coursesByTerm).map(courses => ({
            term: courses[0].term,
            courses,
          })),
        ),
      );
    } catch (e) {
      const errors = [
        {
          key: 'general',
          message: e,
        },
      ];
      dispatch(getCoursesFail(errors));
      throw e;
    }
  };
}

export function setCrosslistTarget({ courseId, sectionIds, xlisted }) {
  return {
    type: SET_XLIST_TARGET,
    payload: {
      courseId,
      sectionIds,
      xlisted,
    },
  };
}

export function crosslistSectionDone({ courseId, sectionId }) {
  return {
    type: XLIST_SECTION_DONE,
    payload: {
      courseId,
      sectionId,
    },
  };
}

export function crosslistSectionFail(errors) {
  return { type: XLIST_SECTION_FAIL, payload: errors };
}

export function crosslistSection({ courseId, sectionId }) {
  return {
    type: XLIST_SECTION,
    payload: {
      courseId,
      sectionId,
    },
  };
}

export function uncrosslistSectionDone({ sectionId }) {
  return {
    type: UNXLIST_SECTION_DONE,
    payload: {
      sectionId,
    },
  };
}

export function uncrosslistSectionFail(errors) {
  return { type: UNXLIST_SECTION_FAIL, payload: errors };
}

export function uncrosslistSection({ sectionId }) {
  return {
    type: UNXLIST_SECTION,
    payload: {
      sectionId,
    },
  };
}
