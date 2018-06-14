/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import courses from './queries/courses';
import section from './queries/section';

import crosslistCourse from './mutations/crosslistCourse';
import deCrosslistCourse from './mutations/deCrosslistCourse';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      courses,
      section,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      crosslistCourse,
      deCrosslistCourse,
    },
  }),
});

export default schema;
