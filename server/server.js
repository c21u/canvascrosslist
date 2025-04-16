import createError from "http-errors";
import express from "express";
import path from "path";
import { dirname } from "path";
// import Sentry from "@sentry/node";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { Provider as lti } from "ltijs";
import Database from "ltijs-sequelize";
import config from "./config.js";

import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import { trustProxy } from "./config.js";

const db = new Database(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    host: config.database.host,
    dialect: "postgres",
    logging: false,
  }
);

// Setup ltijs
lti.setup(
  config.lti.ltiKey,
  { plugin: db },
  {
    staticPath: "dist",
    cookies: {
      secure: false,
      sameSite: "None",
    },
    tokenMaxAge: false,
    devMode: true,
  }
);

lti.app.use((req, res, next) => {
  console.log("Incoming request type:", req.method);
  console.log("Incoming request url:", req.originalUrl);
  next();
});

lti.app.use(cookieParser());

// eslint-disable-next-line new-cap
const router = express.Router();

lti.app.use(express.json({ limit: "10mb" }));
lti.app.use(express.urlencoded({ extended: false, limit: "10mb" }));
lti.app.set("trust proxy", trustProxy);

lti.onConnect(async (token, req, res) => {
  console.log("lti.onConnect!!!");
  return res.sendFile("index.html", { root: "dist" });
});

lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, "/deeplink", { newResource: true });
});

const getEnvPrefix = (prefix) =>
  Object.keys(process.env).filter((key) => key.startsWith(prefix));

const setup = async () => {
  const prefixes = getEnvPrefix("CLIENT_ID");
  await lti.deploy({ port: process.env.PORT || "3000", debug: true });
  for (const prefix of prefixes) {
    await lti.registerPlatform({
      url: config.lti.canvasRegUrl,
      name: "GATECH",
      clientId: process.env[prefix],
      authenticationEndpoint: `${config.lti.canvasRegUrl}/api/lti/authorize_redirect`,
      accesstokenEndpoint: `${config.lti.canvasRegUrl}/login/oauth2/token`,
      authConfig: {
        method: "JWK_SET",
        key: `${config.lti.canvasRegUrl}/api/lti/security/jwks`,
      },
    });
  }
};
setup();

router.get("/lti", (req, res) => {
  const token = req.token || "";
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>Your LTI Application</title>
      <script>
        localStorage.setItem('ltik', '${token}');
      </script>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
  </head>
    <body>
      <div id="lti_root"></div>
      <script src="/app.bundle.js"></script>
    </body>
    </html>
  `);
});

const __dirname = dirname(fileURLToPath(import.meta.url));

router.post("/lti", (req, res) => {
  return res.sendFile("index.html", { root: "dist" });
});

lti.app.use(router);

lti.app.use(express.static(path.join(__dirname, "..", "dist")));

lti.app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

lti.app.use("/lti/api/", apiRouter);

lti.app.use("/", indexRouter);

// catch 404 and forward to error handler
lti.app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
lti.app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

export default lti.app;
