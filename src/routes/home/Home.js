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
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { setCrosslistTarget } from '../../actions/crosslist';
import Spinner from '../../components/Spinner';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.object.isRequired,
        courses: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            course_code: PropTypes.string.isRequired,
            term: PropTypes.object,
          }),
        ).isRequired,
      }),
    ).isRequired,
  };

  render() {
    const courses =
      this.props.courses.length === 0 ? (
        <Spinner />
      ) : (
        <form onSubmit={setCrosslistTarget}>
          {this.props.courses.map(term => (
            <div key={term.term.id}>
              <h1 className={s.termTitle}>{term.term.name}</h1>
              {term.courses.map(course => (
                <div key={course.id} className={s.course}>
                  <input
                    type="radio"
                    name="xlist-target"
                    value={course.id}
                    id={course.id}
                  />
                  <label htmlFor={course.id} className={s.courseInfo}>
                    <h2 className={s.courseTitle}>{course.name}</h2>
                    <div className={s.courseDesc}>
                      {course.course_code} - {course.sis_course_id}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Next</button>
        </form>
      );

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Select the course you would like to crosslist sections into</h1>
          {courses}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { courses } = state.canvas;
  return { courses };
}

export default connect(mapStateToProps)(withStyles(s)(Home));
