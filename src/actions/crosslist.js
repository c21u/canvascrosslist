import {
  GET_COURSES,
  GET_COURSES_DONE,
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  UNXLIST_SECTION_DONE,
} from '../constants';

export function getCourses() {
  return { type: GET_COURSES };
}

export function getCoursesDone(courses) {
  return { type: GET_COURSES_DONE, payload: { courses } };
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

export function crosslistSection({ courseId, sectionId }) {
  return {
    type: XLIST_SECTION,
    payload: {
      courseId,
      sectionId,
    },
  };
}

export function uncrosslistSection({ sectionId }) {
  return {
    type: UNXLIST_SECTION,
    payload: {
      sectionId,
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

export function uncrosslistSectionDone({ sectionId }) {
  return {
    type: UNXLIST_SECTION_DONE,
    payload: {
      sectionId,
    },
  };
}
