/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Spinner.css';

export default function Spinner() {
  useStyles(s);
  return (
    <div className={s.spinner}>
      <div className={s.bounce1} />
      <div className={s.bounce2} />
      <div className={s.bounce3} />
    </div>
  );
}
