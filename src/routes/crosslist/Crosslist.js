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
import Link from '../../components/Link';
import Spinner from '../../components/Spinner';
import Course from '../../components/Course';
import WarningList from '../../components/WarningList';
import s from './Crosslist.css';

function renderErrors(errors) {
  return errors ? (
    <p>
      There was an error communicating with Canvas, please{' '}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="#" onClick={Location.reload}>
        refresh the page
      </Link>{' '}
      to continue.
    </p>
  ) : null;
}

function renderNoCourses(terms, errors) {
  if (!errors && terms.allIds.length === 0) {
    return (
      <h1>
        You do not appear to be listed as instructor of any active courses.
      </h1>
    );
  }
  return null;
}

class Crosslist extends React.Component {
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
    errors: PropTypes.arrayOf(PropTypes.string),
    canvasUrl: PropTypes.string.isRequired,
  };

  static defaultProps = {
    target: null,
    errors: null,
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
      errors,
      canvasUrl,
    } = this.props;

    if (fetching) {
      return <Spinner />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>Combine Courses</h2>
          {renderErrors(errors)}
          {renderNoCourses(terms, errors)}
          {errors || terms.allIds.length === 0 ? null : (
            <>
              <WarningList
                warnings={[
                  'If you choose to combine courses, please start with your largest projected section as the primary course section, i.e. the one you "manage". Course materials and grades technically reside within this section and it is important to structure your combined courses in this way.',
                  'Do not combine sections if students have already submitted work in one of your sections. Coursework is retained with the course, not with the section enrollments. So if a section is combined with a section in another course, all enrollments will lose any associated assignment submissions and grades.',
                  'Sections can only be in one course at a time.',
                  'Once a section is combined with another section, you can separate the section back out. This will return it to its original course.',
                  'You can rename your combined course by navigating to your course in Canvas, clicking "Settings" in the course navigation along the left, then making sure the "Course Details" tab is selected at the top.',
                ]}
              />
              <div className={s.note}>
                <p>
                  If you would like to isolate your sections, send your request
                  to <a href="mailto:canvas@gatech.edu">canvas@gatech.edu</a>.
                </p>
              </div>
              <div className={s.note}>
                <h3>
                  To get started, click the &quot;Manage&quot; button on the
                  course you would like to combine sections into.
                </h3>
              </div>
              {terms.allIds
                .sort((a, b) => terms.byId[a].end_at - terms.byId[b].end_at)
                .map(termId => (
                  <div key={termId}>
                    <h1 className={s.termTitle}>{terms.byId[termId].name}</h1>
                    {terms.byId[termId].courses
                      .filter(
                        courseId => courses.byId[courseId].sections.length > 0,
                      )
                      .sort((a, b) =>
                        courses.byId[a].name.localeCompare(
                          courses.byId[b].name,
                        ),
                      )
                      .map(courseId => (
                        <Course
                          key={courseId}
                          id={courseId}
                          course={courses.byId[courseId]}
                          xlist={xlist}
                          unxlist={unxlist}
                          setTargetOnClick={() => setTarget(termId, courseId)}
                          isTarget={target === courseId}
                          targetExists={!!target}
                          pending={pending}
                          available={available}
                          sections={sections}
                          canvasUrl={canvasUrl}
                        />
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
    errors,
  } = state.crosslist;
  const canvasUrl = state.user.custom_canvas_api_domain;
  return {
    terms,
    courses,
    sections,
    target,
    available,
    pending,
    fetching,
    errors,
    canvasUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTarget: (termId, courseId) => {
      dispatch(setCrosslistTarget({ termId, courseId }));
    },
    xlist: (sectionId, recentStudentsCount) => {
      dispatch(crosslistSection({ sectionId, recentStudentsCount }));
    },
    unxlist: sectionId => {
      dispatch(uncrosslistSection({ sectionId }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(Crosslist));
