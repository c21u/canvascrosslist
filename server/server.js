import createError from "http-errors";
import express from "express";
import { dirname, join } from "path";
import Sentry from "@sentry/node";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { sentryDSN } from "./config.js";
Sentry.init({ dsn: sentryDSN, environment: process.env.NODE_ENV });

import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import { trustProxy } from "./config.js";

const app = express();

app.set("trust proxy", trustProxy);

app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "..", "dist")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);
app.use("/api/", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(Sentry.Handlers.errorHandler());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

export default app;
