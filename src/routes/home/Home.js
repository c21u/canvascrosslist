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
import {
  setCrosslistTarget,
  crosslistSection,
  uncrosslistSection,
} from '../../actions/crosslist';
import Spinner from '../../components/Spinner';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    terms: PropTypes.shape({
      byId: PropTypes.object.isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    courses: PropTypes.shape({
      byId: PropTypes.object.isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    sections: PropTypes.shape({
      byId: PropTypes.object.isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    fetching: PropTypes.bool.isRequired,
    target: PropTypes.string.isRequired,
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    // pending: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTarget: PropTypes.func.isRequired,
    xlist: PropTypes.func.isRequired,
    // unxlist: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.fetching) {
      return <Spinner />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.terms.allIds.length === 0 ? (
            <h1>
              You do not appear to be listed as instructor of any active
              courses.
            </h1>
          ) : (
            <>
              {this.props.terms.allIds.map(termId => (
                <div key={termId}>
                  <h1 className={s.termTitle}>
                    {this.props.terms.byId[termId].name}
                  </h1>
                  {this.props.terms.byId[termId].courses.map(courseId => (
                    <div
                      key={courseId}
                      className={`${s.course} ${this.props.target ===
                        courseId && s.active}`}
                    >
                      <div className={s.courseInfo}>
                        <h2 className={s.courseTitle}>
                          {this.props.courses.byId[courseId].name}
                        </h2>
                        <div className={s.courseDesc}>
                          {this.props.courses.byId[courseId].course_code} -{' '}
                          {this.props.courses.byId[courseId].sis_course_id}
                        </div>
                        {this.props.target !== courseId && (
                          <button
                            onClick={() =>
                              this.props.setTarget(termId, courseId)
                            }
                          >
                            Manage
                          </button>
                        )}
                      </div>
                      <ul>
                        {this.props.courses.byId[courseId].sections.map(
                          sectionId => (
                            <li key={sectionId}>
                              {this.props.sections.byId[sectionId]}
                              {this.props.available.includes(sectionId) && (
                                <button
                                  onClick={() => this.props.xlist(sectionId)}
                                >
                                  Crosslist
                                </button>
                              )}
                            </li>
                          ),
                        )}
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
  const {
    terms,
    courses,
    sections,
    target,
    available,
    pending,
    fetching,
  } = state.crosslist;
  return { terms, courses, sections, target, available, pending, fetching };
}

function mapDispatchToProps(dispatch) {
  return {
    setTarget: (termId, courseId) => {
      dispatch(setCrosslistTarget({ termId, courseId }));
    },
    xlist: sectionId => {
      dispatch(crosslistSection({ sectionId }));
    },
    unxlist: sectionId => {
      dispatch(uncrosslistSection({ sectionId }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(Home),
);
