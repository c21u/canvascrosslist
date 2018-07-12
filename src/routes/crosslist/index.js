/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Crosslist from './Crosslist';
import Layout from '../../components/Layout';
import { getCourses } from '../../actions/crosslist';

async function action({ store }) {
  store.dispatch(getCourses());
  return {
    title: 'Combine Sections',
    chunks: ['crosslist'],
    component: (
      <Layout>
        <Crosslist />
      </Layout>
    ),
  };
}

export default action;
