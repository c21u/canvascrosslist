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

import crosslistCourses from './mutations/crosslistCourses';
import deCrosslistCourses from './mutations/deCrosslistCourses';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      courses,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      crosslistCourses,
      deCrosslistCourses,
    },
  }),
});

export default schema;
