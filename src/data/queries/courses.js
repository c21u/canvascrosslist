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
      .then(coursesData => {
        const theCourses = Array.isArray(coursesData)
          ? coursesData
          : [coursesData];
        const recentStudents = theCourses.map(course =>
          canvas
            .get(`courses/${course.id}/recent_students`)
            .then(recentStudentsData => {
              const updatedCourse = course;
              updatedCourse.recent_students = recentStudentsData.filter(
                recentStudent => !!recentStudent.last_login,
              ).length;
              return updatedCourse;
            }),
        );
        return Promise.all(recentStudents).then(() => theCourses);
      })
      .then(coursesData => {
        const sections = coursesData.map(course =>
          canvas.get(`courses/${course.id}/sections`),
        );
        return Promise.all(sections).then(sectionsData => ({
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
      );
  },
};

export default courses;
