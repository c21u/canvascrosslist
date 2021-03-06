import {
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  XLIST_SECTION_FAIL,
  UNXLIST_SECTION_DONE,
  UNXLIST_SECTION_FAIL,
  GET_COURSES,
  GET_COURSES_DONE,
  GET_COURSES_FAIL,
  GET_COURSE_DONE,
  GET_COURSE_FAIL,
} from '../constants';

export default function crosslist(
  state = {
    initialized: false,
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
          .map(courseId =>
            courseId === action.payload.courseId
              ? []
              : state.courses.byId[courseId].sections,
          )
          .reduce((acc, cur) => acc.concat(cur)),
      };
    case XLIST_SECTION: {
      const sectionFilter = sectionId => action.payload.sectionId !== sectionId;

      return {
        ...state,
        // move section from available to pending
        available: state.available.filter(sectionFilter),
        pending: [...state.pending, action.payload.sectionId],
        // remove the section from the course it's currently in
        courses: {
          ...state.courses,
          byId: Object.entries(state.courses.byId)
            .map(([key, value]) => [
              key,
              {
                ...value,
                ...(key === state.target ? { saveState: 'saving' } : null),
                sections:
                  key === state.target
                    ? [
                        ...state.courses.byId[state.target].sections,
                        action.payload.sectionId,
                      ]
                    : value.sections.filter(sectionFilter),
              },
            ])
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
        },
      };
    }
    case UNXLIST_SECTION:
      return {
        ...state,
        // move section from xlisted to pending
        pending: [...state.pending, action.payload.sectionId],
      };
    case XLIST_SECTION_DONE:
      return {
        ...state,
        // move section from pending to xlisted
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        courses: {
          ...state.courses,
          byId: Object.entries(state.courses.byId)
            .map(([key, value]) => [
              key,
              {
                ...value,
                ...(value.sections.includes(action.payload.sectionId)
                  ? { saveState: 'saved' }
                  : null),
              },
            ])
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
        },
      };
    case UNXLIST_SECTION_DONE: {
      const sectionFilter = sectionId => action.payload.sectionId !== sectionId;
      return {
        ...state,
        // move section from pending to available
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        available: [...state.available, action.payload.sectionId],
        // move section to its original course
        courses: {
          ...state.courses,
          byId: {
            ...Object.entries(state.courses.byId)
              .map(([key, value]) => {
                if (key === action.payload.courseId) {
                  return [
                    key,
                    {
                      ...value,
                      saveState: 'saved',
                      sections: value.sections.includes(
                        action.payload.sectionId,
                      )
                        ? value.sections
                        : [...value.sections, action.payload.sectionId],
                    },
                  ];
                }
                return [
                  key,
                  {
                    ...value,
                    ...(value.sections.includes(action.payload.sectionId)
                      ? { saveState: 'saved' }
                      : null),
                    sections: value.sections.filter(sectionFilter),
                  },
                ];
              })
              .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
          },
        },
      };
    }
    case GET_COURSES:
      return {
        ...state,
        initialized: true,
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
    case GET_COURSE_DONE:
      return {
        ...state,
        courses: {
          ...state.courses,
          allIds: [...state.courses.allIds, action.payload.courseId],
          byId: {
            ...state.courses.byId,
            [action.payload.courseId]: action.payload.course,
          },
        },
        terms: {
          ...state.terms,
          byId: {
            ...state.terms.byId,
            [action.payload.termId]: {
              ...state.terms.byId[action.payload.termId],
              courses: [
                ...state.terms.byId[action.payload.termId].courses,
                action.payload.courseId,
              ],
            },
          },
        },
      };
    case GET_COURSES_FAIL: {
      const errors = state.errors ? state.errors : [];
      return {
        ...state,
        fetching: false,
        errors: [...errors, ...action.payload],
      };
    }
    case GET_COURSE_FAIL: {
      const errors = state.errors ? state.errors : [];
      return {
        ...state,
        errors: [...errors, ...action.payload],
      };
    }
    case XLIST_SECTION_FAIL: {
      const errors = state.errors ? state.errors : [];
      return {
        ...state,
        errors: [...errors, ...action.payload],
      };
    }
    case UNXLIST_SECTION_FAIL: {
      const errors = state.errors ? state.errors : [];
      return {
        ...state,
        errors: [...errors, ...action.payload],
      };
    }
    default:
      return state;
  }
}
