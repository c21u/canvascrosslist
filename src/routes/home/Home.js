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

class Home extends React.Component {
  static propTypes = {
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        course_code: PropTypes.string.isRequired,
        term: PropTypes.object,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Courses</h1>
          {this.props.courses.map(item => (
            <article key={item.id} className={s.newsItem}>
              <h1 className={s.newsTitle}>
                <a href={item.link}>{item.name}</a>
              </h1>
              <div className={s.newsDesc}>{item.course_code}</div>
              <div className={s.newsDesc}>{item.sis_id}</div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
