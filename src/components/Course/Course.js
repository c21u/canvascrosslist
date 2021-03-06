/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Course.css';
import SectionList from '../SectionList';
import Link from '../Link';

function getSaved(saveState, canvasUrl, id) {
  if (saveState) {
    if (saveState === 'saving') {
      return <div className={s.saved}>Saving changes...</div>;
    }
    return (
      <div className={s.saved}>
        Changes saved -
        {' ' /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          /* eslint-disable-next-line no-return-assign */
          onClick={() =>
            (window.parent.location = `https://${canvasUrl}/courses/${id}/settings`)
          }
          to="#"
        >
          Edit Course Name
        </Link>
      </div>
    );
  }
  return null;
}

export default function Course(props) {
  useStyles(s);
  const {
    course,
    setTargetOnClick,
    isTarget,
    targetExists,
    pending,
    available,
    sections,
    canvasUrl,
    id,
    xlist,
    unxlist,
  } = props;
  return (
    <div className={`${s.course} ${isTarget && s.active}`}>
      <div className={s.courseInfo}>
        <h2 className={s.courseTitle}>{course.name}</h2>
        {!isTarget && (
          <button type="button" onClick={setTargetOnClick}>
            Manage
          </button>
        )}
        <div className={s.courseDesc}>
          {course.course_code} - {course.sis_course_id}
          {targetExists && isTarget ? (
            <p>
              The managed section is the primary course section and should be
              the section that has the most certain or largest projected
              enrollments.
            </p>
          ) : (
            ''
          )}
        </div>
        {targetExists && !isTarget ? (
          <div className={s.studentActivityInfo}>
            {course.recent_students} student
            {course.recent_students === 1 ? ' has ' : 's have '}
            logged in to this course.
          </div>
        ) : (
          ''
        )}
      </div>
      {getSaved(course.saveState, canvasUrl, id)}
      <SectionList
        sections={sections}
        mySections={course.sections}
        courseId={id}
        isTarget={isTarget}
        pending={pending}
        available={available}
        published={course.workflow_state !== 'unpublished'}
        xlist={xlist}
        unxlist={unxlist}
      />
    </div>
  );
}
Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    course_code: PropTypes.string.isRequired,
    recent_students: PropTypes.number.isRequired,
    saveState: PropTypes.string.isRequired,
    sis_course_id: PropTypes.string.isRequired,
    workflow_state: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setTargetOnClick: PropTypes.func.isRequired,
  isTarget: PropTypes.bool.isRequired,
  targetExists: PropTypes.bool.isRequired,
  pending: PropTypes.arrayOf(PropTypes.string).isRequired,
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  sections: PropTypes.shape({
    byId: PropTypes.object.isRequired,
    allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  canvasUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  xlist: PropTypes.func.isRequired,
  unxlist: PropTypes.func.isRequired,
};
