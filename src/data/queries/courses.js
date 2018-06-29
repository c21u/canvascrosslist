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

    const url = args.courseId
      ? `courses/${args.courseId}`
      : `users/${userid}/courses`;

    let options = {
      include: ['term', 'sections'],
    };

    options = args.courseId
      ? options
      : {
          ...options,
          enrollment_role: 'TeacherEnrollment',
          enrollment_state: 'active',
          exclude_blueprint_courses: true,
        };

    return canvas
      .get(url, options)
      .then(
        data =>
          Array.isArray(data)
            ? data.filter(course => course.sis_course_id)
            : [data],
      )
      .catch(err => {
        throw err;
      });
  },
};

export default courses;
