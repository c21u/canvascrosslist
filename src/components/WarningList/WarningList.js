/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './WarningList.css';

let i = 0;
function nextKey() {
  i += 1;
  return i;
}

class WarningList extends React.Component {
  static propTypes = {
    warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  render() {
    return (
      <ul className={s.warning}>
        {this.props.warnings.map(warning => <li key={nextKey}>{warning}</li>)}
      </ul>
    );
  }
}

export default withStyles(s)(WarningList);
