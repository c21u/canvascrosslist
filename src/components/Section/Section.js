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
import Spinner from '../Spinner';

export default function Section(props) {
  const {
    section,
    courseId,
    xlistOnClick,
    unxlistOnClick,
    isTarget,
    isPending,
    isAvailable,
  } = props;

  return (
    <li>
      {section.name}
      {isAvailable && !isPending && (
        <button type="button" onClick={xlistOnClick}>
          Combine
        </button>
      )}
      {isTarget &&
        !isPending &&
        section.nonxlist_course_id &&
        courseId !== section.nonxlist_course_id && (
          <button type="button" onClick={unxlistOnClick}>
            Separate
          </button>
        )}
      {isPending && <Spinner />}
    </li>
  );
}

Section.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string,
    nonxlist_course_id: PropTypes.string,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
  xlistOnClick: PropTypes.func.isRequired,
  unxlistOnClick: PropTypes.func.isRequired,
  isTarget: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  isAvailable: PropTypes.bool.isRequired,
};
