import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: "dist" });
});

export default router;
