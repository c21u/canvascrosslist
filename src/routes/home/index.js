/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{courses{id,name,sis_course_id,course_code,term{id, name}}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.courses)
    throw new Error('Failed to load the course feed.');
  return {
    title: 'Crosslist',
    chunks: ['home'],
    component: (
      <Layout>
        <Home courses={data.courses} />
      </Layout>
    ),
  };
}

export default action;
