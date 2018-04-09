/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import LTIStrategy from 'passport-lti';
import lti from 'ims-lti';
import { Op } from 'sequelize';
import { LTISecret } from './data/models';
// import config from './config';

/**
 * Sign in with Facebook.
 */
passport.use(
  new LTIStrategy(
    {
      createProvider: (req, done) => {
        const key = req.body.oauth_consumer_key;
        LTISecret.findOne({
          attributes: ['secret'],
          where: { key: { [Op.eq]: key } },
        })
          .then(secret => done(null, new lti.Provider(key, secret)))
          .catch(err => done(err));
      },
    },
    (ltiContext, done) => done(null, ltiContext),
  ),
);

export default passport;
