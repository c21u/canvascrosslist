import { GET_COURSES, GET_COURSES_DONE } from '../constants';

export default function canvas(
  state = { courses: [], fetching: true },
  action,
) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: [],
        fetching: true,
      };
    case GET_COURSES_DONE:
      return {
        ...state,
        courses: action.payload.courses,
        fetching: false,
      };
    default:
      return state;
  }
}
