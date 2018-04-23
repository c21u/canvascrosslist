import { GraphQLList as List } from 'graphql';
import Canvas from 'canvas-lms-api';
import CourseItemType from '../types/CourseItemType';
import config from '../../config';

const canvas = new Canvas(config.canvas.url, {
  accessToken: config.canvas.token,
});

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const courses = {
  type: new List(CourseItemType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = canvas
        .get(
          '/courses',
          '?enrollment_role_id=TeacherEnrollment&enrollment_state=active&exclude_blueprint_courses=true&include=term',
        )
        .then(data => {
          items = data.filter(course => course.sis_course_id);

          lastFetchTask = null;
          return data;
        })
        .catch(err => {
          lastFetchTask = null;
          throw err;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default courses;
