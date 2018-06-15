import { GraphQLList as List, GraphQLID as StringType } from 'graphql';
import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import CourseItemType from '../types/CourseItemType';
import config from '../../config';

const canvas = new Canvas(config.canvas.url, {
  accessToken: config.canvas.token,
});

const courses = {
  type: new List(CourseItemType),
  args: {
    courseId: { type: StringType },
  },

  resolve(obj, args, ctx) {
    const userid = ctx.user
      ? ctx.user.custom_canvas_user_id
      : jwt.verify(ctx.token, config.auth.jwt.secret).custom_canvas_user_id;

    let url = `users/${userid}/courses`;
    if (args.courseId) {
      url += `/${args.courseId}`;
    }
    return canvas
      .get(url, {
        enrollment_role: 'TeacherEnrollment',
        enrollment_state: 'active',
        exclude_blueprint_courses: true,
        include: ['term', 'sections'],
      })
      .then(data => data.filter(course => course.sis_course_id))
      .catch(err => {
        throw err;
      });
  },
};

export default courses;
