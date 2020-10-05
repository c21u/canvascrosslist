/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './WarningList.css';

let i = 0;
function nextKey() {
  i += 1;
  return i;
}

export default function WarningList({ warnings }) {
  useStyles(s);
  return (
    <ul className={s.warning}>
      {warnings.map(warning => (
        <li key={nextKey()}>{warning}</li>
      ))}
    </ul>
  );
}

WarningList.propTypes = {
  warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
};
