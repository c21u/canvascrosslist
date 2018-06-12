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
    fetching: PropTypes.bool.isRequired,
    setTarget: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.fetching) {
      return <Spinner />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.courses.length === 0 ? (
            <h1>
              You do not appear to be listed as instructor of any active
              courses.
            </h1>
          ) : (
            <>
              {this.props.courses.map(term => (
                <div key={term.term.id}>
                  <h1 className={s.termTitle}>{term.term.name}</h1>
                  {term.courses.map(course => (
                    <div key={course.id} className={s.course}>
                      <div className={s.courseInfo}>
                        <h2 className={s.courseTitle}>{course.name}</h2>
                        <div className={s.courseDesc}>
                          {course.course_code} - {course.sis_course_id}
                        </div>
                        <button
                          onClick={() =>
                            this.props.setTarget(
                              course.id,
                              term.courses.reduce(
                                (acc, curr) =>
                                  acc.concat(
                                    curr.sections.map(section => section.id),
                                  ),
                                [],
                              ),
                              course.sections,
                            )
                          }
                        >
                          Manage
                        </button>
                      </div>
                      <ul>
                        {course.sections.map(section => (
                          <li key={section.id}>{section.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { courses, fetching } = state.canvas;
  return { courses, fetching };
}

function mapDispatchToProps(dispatch) {
  return {
    setTarget: (courseId, sectionIds, xlisted) => {
      dispatch(setCrosslistTarget({ courseId, sectionIds, xlisted }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(Home),
);
