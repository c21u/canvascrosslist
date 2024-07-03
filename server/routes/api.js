import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
import jwtMiddleware from "../lib/jwt.js";
import handler from "./handlers/Handler.js";

router.use(jwtMiddleware);

router.post("/test", async (req, res, next) => {
  res.send({
    message: "Testing!!",
  });
});

router.post("/get-courses", async (req, res, next) => {
  // const userId = req.user.custom_canvas_user_id;
  // *** since I don't have many courses, using the id below for testing purposes
  const userId = "16696";
  console.log("RUNNING GET COURSES");
  handler
    .getCourses("16696")
    .then((courses) => {
      console.log("GOT COURSES");
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
      req.body.target,
      req.body.sectionId,
      req.user.custom_canvas_user_id,
      req.user.custom_lis_user_username
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
      req.user.custom_canvas_user_id,
      req.user.custom_lis_user_username
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
      console.log("router response***", response);
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
