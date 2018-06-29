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
import Section from '../../components/Section';
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
    target: PropTypes.string,
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    pending: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTarget: PropTypes.func.isRequired,
    xlist: PropTypes.func.isRequired,
    unxlist: PropTypes.func.isRequired,
  };

  static defaultProps = {
    target: null,
  };

  render() {
    const {
      terms,
      courses,
      sections,
      fetching,
      target,
      pending,
      available,
      setTarget,
      xlist,
      unxlist,
    } = this.props;

    if (fetching) {
      return <Spinner />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {terms.allIds.length === 0 ? (
            <h1>
              You do not appear to be listed as instructor of any active
              courses.
            </h1>
          ) : (
            <>
              <ul className={s.warning}>
                <li>
                  Do not combine sections if students have already submitted
                  work in one of your sections. Coursework is retained with the
                  course, not with the section enrollments. So if a section is
                  combined with a section in another course, all enrollments
                  will lose any associated assignment submissions and grades.
                </li>
                <li>Sections can only be in one course at a time.</li>
                <li>
                  Once a section is combined with another section, you can
                  separate the section back out. This will return it to its
                  original course.
                </li>
              </ul>
              <div className={s.note}>
                <p>
                  Section visibility is an important option to help protect you
                  from violating the Federal Education Rights Privacy Act
                  (FERPA). You can allow students to communicate and view
                  students in other sections, or you can isolate students to
                  their section. If course sections meet together and you would
                  like students to communicate with each other, do not isolate
                  your sections. If course sections do not meet together, we
                  recommend isolating the sections to comply with FERPA. This
                  setting affects all combined sections.
                </p>
                <p>
                  If you would like to isolate your sections, send your request
                  to <a href="mailto:canvas@gatech.edu">canvas@gatech.edu</a>.
                </p>
              </div>
              {terms.allIds.map(termId => (
                <div key={termId}>
                  <h1 className={s.termTitle}>{terms.byId[termId].name}</h1>
                  {terms.byId[termId].courses
                    .filter(
                      courseId => courses.byId[courseId].sections.length > 0,
                    )
                    .map(courseId => (
                      <div
                        key={courseId}
                        className={`${s.course} ${target === courseId &&
                          s.active}`}
                      >
                        <div className={s.courseInfo}>
                          <h2 className={s.courseTitle}>
                            {courses.byId[courseId].name}
                          </h2>
                          <div className={s.courseDesc}>
                            {courses.byId[courseId].course_code} -{' '}
                            {courses.byId[courseId].sis_course_id}
                          </div>
                          {target !== courseId && (
                            <button onClick={() => setTarget(termId, courseId)}>
                              Manage
                            </button>
                          )}
                        </div>
                        <ul>
                          {courses.byId[courseId].sections.map(sectionId => (
                            <Section
                              key={sectionId}
                              section={sections.byId[sectionId]}
                              sisCourseId={courses.byId[courseId].sis_course_id}
                              xlistOnClick={() => xlist(sectionId)}
                              unxlistOnClick={() => unxlist(sectionId)}
                              isTarget={target === courseId}
                              isPending={pending.includes(sectionId)}
                              isAvailable={available.includes(sectionId)}
                            />
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
