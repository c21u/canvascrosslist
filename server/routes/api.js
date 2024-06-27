import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
import jwtMiddleware from "../lib/jwt.js";
import canvas from "../dataLayer/Canvas.js";

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
  canvas
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
  canvas
    .crossListSection(
      req.body.target,
      req.body.sectionId,
      req.user.custom_canvas_user_id,
      req.user.custom_lis_user_username
    )
    .then((response) => {
      res.status(200).send(response);
    });
});

router.post("/uncrosslist-section", (req, res, next) => {
  canvas
    .unCrossListSection(
      req.body.sectionId,
      req.user.custom_canvas_user_id,
      req.user.custom_lis_user_username
    )
    .then((response) => {
      res.status(200).send(response);
    });
});

export default router;
