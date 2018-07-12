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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Link from '../../components/Link';

class Home extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
  };

  render() {
    const { html } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            className={s.linkButton}
            to="#"
            onClick={() => (window ? window.print() : null)}
          >
            Print Page
          </Link>
        </div>
        <div>
          <Link className={s.linkButton} to="/crosslist">
            I Understand These Guidelines, Continue
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
