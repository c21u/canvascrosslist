import passport from "passport";
import PassportLTIStrategy from "passport-lti";
import PassportLocalStrategy from "passport-local";
import imsLTI from "ims-lti";
import {
  fakeStrategyCredentials as fakeAuth,
  lti as ltiAuth,
  passportStrategy,
} from "../config.js";

const ltiStrategy = new PassportLTIStrategy(
  {
    createProvider: (req, done) => {
      const key = req.body.oauth_consumer_key;
      if (key === ltiAuth.key) {
        return done(null, new imsLTI.Provider(key, ltiAuth.secret));
      } else {
        // createProvider expects failure-to-lookup-credentials case to
        // return with a single string, not a Passport verify signature
        done("Not authorized.");
      }
    },
  },
  (ltiContext, done) => {
    return done(null, ltiContext);
  }
);

const fakeStrategy = new PassportLocalStrategy((username, password, done) => {
  if (username === fakeAuth.username && password === fakeAuth.password) {
    return done(null, {});
  }
  return done(null, false);
});

passportStrategy === "fake"
  ? passport.use("fake", fakeStrategy)
  : passport.use("lti", ltiStrategy);

export default passport;
