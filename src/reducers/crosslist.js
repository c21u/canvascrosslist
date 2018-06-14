import {
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  UNXLIST_SECTION_DONE,
  GET_COURSES,
  GET_COURSES_DONE,
} from '../constants';

export default function crosslist(
  state = {
    target: null,
    available: [],
    pending: [],
    terms: { byId: {}, allIds: [] },
    courses: { byId: {}, allIds: [] },
    sections: { byId: {}, allIds: [] },
    fetching: true,
  },
  action,
) {
  switch (action.type) {
    case SET_XLIST_TARGET:
      return {
        ...state,
        target: action.payload.courseId,
        // Get a flat array of all the sectionIds for the term that corresponds to the selected course
        available: state.terms.byId[action.payload.termId].courses
          .map(
            courseId =>
              courseId === action.payload.courseId
                ? []
                : state.courses.byId[courseId].sections,
          )
          .reduce((acc, cur) => acc.concat(cur)),
      };
    case XLIST_SECTION: {
      const sectionFilter = sectionId => action.payload.sectionId !== sectionId;

      // remove the section from the course it's currently in
      const newCoursesById = Object.entries(state.courses.byId)
        .map(([key, value]) => [
          key,
          {
            ...value,
            sections: value.sections.filter(sectionFilter),
          },
        ])
        .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});

      const newState = {
        ...state,
        // move section from available to pending
        available: state.available.filter(sectionFilter),
        pending: [...state.pending, action.payload.sectionId],
      };
      newState.courses.byId = newCoursesById;
      return newState;
    }
    case UNXLIST_SECTION: {
      const sectionFilter = sectionId => action.payload.sectionId !== sectionId;
      const newState = {
        ...state,
        // move section from xlisted to pending
        pending: [...state.pending, action.payload.sectionId],
      };
      newState.courses.byId[state.target].sections = newState.courses.byId[
        state.target
      ].sections.filter(sectionFilter);
      return newState;
    }
    case XLIST_SECTION_DONE: {
      const newState = {
        ...state,
        // move section from pending to xlisted
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
      };
      newState.courses.byId[action.payload.courseId].sections = [
        ...state.courses.byId[action.payload.courseId].sections,
        action.payload.sectionId,
      ];
      return newState;
    }
    case UNXLIST_SECTION_DONE: {
      const newState = {
        ...state,
        // move section from pending to available
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        available: [...state.available, action.payload.sectionId],
      };
      // put the section back in it's original course
      newState.courses.byId[action.payload.courseId].sections = [
        ...state.courses.byId[action.payload.courseId].sections,
        action.payload.courseId,
      ];
      return newState;
    }
    case GET_COURSES:
      return {
        ...state,
        terms: { byId: {}, allIds: [] },
        courses: { byId: {}, allIds: [] },
        sections: { byId: {}, allIds: [] },
        fetching: true,
      };
    case GET_COURSES_DONE:
      return {
        ...state,
        terms: action.payload.terms,
        courses: action.payload.courses,
        sections: action.payload.sections,
        fetching: false,
      };
    default:
      return state;
  }
}
