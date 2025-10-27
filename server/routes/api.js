import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
import handler from "./handlers/Handler.js";

router.post("/test", async (req, res, next) => {
  res.send({
    message: "Testing!!",
  });
});

router.post("/get-courses", async (req, res, next) => {
  const userId = req.res.locals.context.custom.canvas_user_id;
  handler
    .getCourses(userId)
    .then((courses) => {
      res.send({
        userId,
        courses,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(`Error fetching courses from canvas`);
    });
});

router.post("/crosslist-section", (req, res, next) => {
  handler
    .crossListSection(
      req.body.courseId,
      req.body.sectionId,
      req.body.crn,
      req.res.locals.context.custom.canvas_user_id,
      req.res.locals.context.custom.lis_user_username
    )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/uncrosslist-section", (req, res, next) => {
  handler
    .unCrossListSection(
      req.body.sectionId,
      req.body.crn,
      req.res.locals.context.custom.canvas_user_id,
      req.res.locals.context.custom.lis_user_username
    )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/isolate-section", (req, res, next) => {
  handler
    .isolateSection(req.body.termCode, req.body.crn, req.body.action)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/check-section-isolation", (req, res, next) => {
  handler
    .checkSectionIsolation(req.body.termCode, req.body.crn)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
