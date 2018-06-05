import { GET_COURSES, GET_COURSES_DONE } from '../constants';

export default function canvas(state = { courses: [] }, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: [],
      };
    case GET_COURSES_DONE:
      return {
        ...state,
        courses: action.payload.courses,
      };
    default:
      return state;
  }
}
