import {
  SET_XLIST_TARGET,
  XLIST_SECTION,
  UNXLIST_SECTION,
  XLIST_SECTION_DONE,
  UNXLIST_SECTION_DONE,
} from '../constants';

export default function crosslist(
  state = { target: null, available: [], xlisted: [], pending: [] },
  action,
) {
  switch (action.type) {
    case SET_XLIST_TARGET:
      return {
        ...state,
        target: action.payload.courseId,
        available: action.payload.sectionIds,
        xlisted: action.payload.xlisted,
        pending: [],
      };
    case XLIST_SECTION:
      return {
        ...state,
        // move section from available to pending
        available: state.available.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        pending: [...state.pending, action.payload.sectionId],
      };
    case UNXLIST_SECTION:
      return {
        ...state,
        // move section from xlisted to pending
        xlisted: state.xlisted.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        pending: [...state.pending, action.payload.sectionId],
      };
    case XLIST_SECTION_DONE:
      return {
        ...state,
        // move section from pending to xlisted
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        xlisted: [...state.xlisted, action.payload.sectionId],
      };
    case UNXLIST_SECTION_DONE:
      return {
        ...state,
        // move section from pending to available
        pending: state.pending.filter(
          sectionId => action.payload.sectionId !== sectionId,
        ),
        available: [...state.available, action.payload.sectionId],
      };
    default:
      return state;
  }
}
