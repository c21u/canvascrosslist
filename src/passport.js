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
// import { User, UserLogin, UserClaim, UserProfile } from './data/models';
// import config from './config';

/**
 * Sign in with Facebook.
 */
passport.use(
  new LTIStrategy(
    {
      createProvider: (req, done) => {
        const key = req.body.oauth_consumer_key;
        const secret = 'FIXME';
        return done(null, new lti.Provider(key, secret));
      },
    },
    (ltiContext, done) => done(null, ltiContext),
  ),
);

export default passport;
