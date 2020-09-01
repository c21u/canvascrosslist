/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import {
  getCourses,
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

const mapState = state => ({
  ...state.crosslist,
  canvasUrl: state.user.custom_canvas_api_domain,
});
const mapDispatch = {
  getCourses,
  setCrosslistTarget,
  crosslistSection,
  uncrosslistSection,
};

export default connect(
  mapState,
  mapDispatch,
)(function Crosslist(props) {
  const {
    terms,
    courses,
    sections,
    fetching,
    target,
    pending,
    available,
    errors,
    canvasUrl,
    initialized,
  } = props;

  useStyles(s);
  if (!initialized) {
    props.getCourses();
  }

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
                If you would like to isolate your sections, send your request to{' '}
                <a href="mailto:canvas@gatech.edu">canvas@gatech.edu</a>.
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
                      courses.byId[a].name.localeCompare(courses.byId[b].name),
                    )
                    .map(courseId => (
                      <Course
                        key={courseId}
                        id={courseId}
                        course={courses.byId[courseId]}
                        xlist={crosslistSection}
                        unxlist={uncrosslistSection}
                        setTargetOnClick={() =>
                          setCrosslistTarget({ termId, courseId })
                        }
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
});
