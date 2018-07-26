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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Course.css';
import SectionList from '../SectionList';

class Course extends React.Component {
  static propTypes = {
    course: PropTypes.shape({
      name: PropTypes.string.isRequired,
      course_code: PropTypes.string.isRequired,
      sis_course_id: PropTypes.string.isRequired,
      sections: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    xlist: PropTypes.func.isRequired,
    unxlist: PropTypes.func.isRequired,
    setTargetOnClick: PropTypes.func.isRequired,
    isTarget: PropTypes.bool.isRequired,
    pending: PropTypes.arrayOf(PropTypes.string).isRequired,
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    sections: PropTypes.shape({
      byId: PropTypes.object.isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    canvasUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  render() {
    const {
      course,
      xlist,
      unxlist,
      setTargetOnClick,
      isTarget,
      pending,
      available,
      sections,
      canvasUrl,
      id,
    } = this.props;
    return (
      <div className={`${s.course} ${isTarget && s.active}`}>
        <div className={s.courseInfo}>
          <h2 className={s.courseTitle}>{course.name}</h2>
          {!isTarget && <button onClick={setTargetOnClick}>Manage</button>}
          {isTarget && (
            <button
              /* eslint-disable-next-line no-return-assign */
              onClick={() =>
                (window.parent.location = `https://${canvasUrl}/courses/${id}/settings`)
              }
            >
              <FontAwesomeIcon icon="cog" />
            </button>
          )}
          <div className={s.courseDesc}>
            {course.course_code} - {course.sis_course_id}
          </div>
        </div>
        <SectionList
          sections={sections}
          mySections={course.sections}
          sisCourseId={course.sis_course_id}
          xlist={xlist}
          unxlist={unxlist}
          isTarget={isTarget}
          pending={pending}
          available={available}
        />
      </div>
    );
  }
}

export default withStyles(s)(Course);
