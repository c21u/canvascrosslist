import { GraphQLList as List, GraphQLID as StringType } from 'graphql';
import Canvas from 'canvas-lms-api';
import jwt from 'jsonwebtoken';
import PQueue from 'p-queue';
import CourseItemType from '../types/CourseItemType';
import config from '../../config';

const courses = {
  type: new List(CourseItemType),
  args: {
    courseId: { type: StringType },
  },

  resolve(obj, args, ctx) {
    const queue = new PQueue({ concurrency: 50 });

    const user = ctx.user
      ? ctx.user
      : jwt.verify(ctx.token, config.auth.jwt.secret);

    const canvas = new Canvas(user.custom_canvas_api_baseurl, {
      accessToken: config.canvas.token,
    });

    const userid = user.custom_canvas_user_id;

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
      .then(coursesData =>
        Array.isArray(coursesData) ? coursesData : [coursesData],
      )
      .then(theCourses => {
        const courseActivity = theCourses.map(course => () =>
          /* canvas
            .get(`courses/${course.id}/analytics/student_summaries`)
            .then(summaries => {
              const updatedCourse = course;
              updatedCourse.recent_students = summaries.filter(
                summary => summary.participations > 0,
              ).length;
              return updatedCourse;
            })
            .catch(err => {
              if (err.code === 404) {
                const updatedCourse = course;
                updatedCourse.recent_students = 0;
                return updatedCourse;
              }
              throw new Error(err);
            }), */
          {
            const updatedCourse = course;
            updatedCourse.recent_students = 0;
            return updatedCourse;
          },
        );
        return queue.addAll(courseActivity).then(() => theCourses);
      })
      .then(coursesData => {
        const sections = coursesData.map(course => () =>
          canvas.get(`courses/${course.id}/sections`),
        );
        return queue.addAll(sections).then(sectionsData => ({
          coursesData,
          sectionsData,
        }));
      })
      .then(({ coursesData, sectionsData }) => {
        const sectionMap = {};
        sectionsData.map(sectionLists =>
          sectionLists.map(section => {
            if (section && !sectionMap[section.id]) {
              sectionMap[section.id] = {
                nonxlist_course_id: section.nonxlist_course_id,
              };
            }
            return section;
          }),
        );
        return { coursesData, sectionMap };
      })
      .then(({ coursesData, sectionMap }) =>
        coursesData.map(courseData => {
          const updatedCourseData = courseData;
          updatedCourseData.sections = updatedCourseData.sections.map(
            section => {
              const updatedSection = section;
              updatedSection.nonxlist_course_id =
                sectionMap[updatedSection.id].nonxlist_course_id;
              return updatedSection;
            },
          );
          return updatedCourseData;
        }),
      )
      .then(data =>
        Array.isArray(data)
          ? data.filter(course => course.sis_course_id)
          : [data],
      )
      .catch(console.error);
  },
};

export default courses;
