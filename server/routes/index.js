import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
import jwt from "jsonwebtoken";
import jwtMiddleware from "../lib/jwt.js";
import passport from "../lib/passport.js";

import { googleAnalyticsID, jwtSecret } from "../config.js";

// Passport initialized here but actually used as passport.authenticate()
router.use(passport.initialize());
import { passportStrategy } from "../config.js";

router.post(
  "/",
  passport.authenticate(passportStrategy, { session: false }),
  (req, res, next) => {
    if (req.user) {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, jwtSecret, { expiresIn });
      res.redirect(`/?ga=${googleAnalyticsID}&token=${token}`);
    } else {
      res.sendStatus(401);
    }
  }
);

router.use(jwtMiddleware);

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: "dist" });
});

export default router;
