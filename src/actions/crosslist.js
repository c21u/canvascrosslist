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

export function getCoursesDone(terms, courses, sections) {
  return { type: GET_COURSES_DONE, payload: { terms, courses, sections } };
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
      // Normalize the canvas data
      const terms = { byId: {}, allIds: [] };
      const courses = { byId: {}, allIds: [] };
      const sections = { byId: {}, allIds: [] };
      data.courses.forEach(course => {
        courses.byId[course.id] = {
          name: course.name,
          course_code: course.course_code,
          sis_course_id: course.sis_course_id,
          sections: course.sections.map(section => section.id),
        };
        courses.allIds.push(course.id);
        course.sections.map(section => {
          sections.byId[section.id] = section.name;
          return sections.allIds.push(section.id);
        });
        if (terms.byId[course.term.id]) {
          terms.byId[course.term.id].courses.push(course.id);
        } else {
          terms.byId[course.term.id] = {
            name: course.term.name,
            courses: [course.id],
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
      throw e;
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
