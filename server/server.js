import createError from "http-errors";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { Provider as lti } from "ltijs";
import Database from "ltijs-sequelize";
import logger from "./lib/logger.js";
import config from "./config.js";

import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import { trustProxy } from "./config.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

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
      secure: true,
      sameSite: "None",
    },
    tokenMaxAge: false,
    devMode: false,
  }
);

// eslint-disable-next-line new-cap
const router = express.Router();

lti.app.use(express.json({ limit: "10mb" }));
lti.app.use(express.urlencoded({ extended: false, limit: "10mb" }));
lti.app.set("trust proxy", trustProxy);
lti.app.use(cookieParser());

lti.onConnect(async (token, req, res) => {
  return res.sendFile("index.html", { root: "dist" });
});

const setup = async () => {
  const port = process.env.PORT || "3000";
  await lti.deploy({ port, silent: true });
  logger.info(
    {
      port,
      appRoute: lti.appRoute(),
      loginRoute: lti.loginRoute(),
      keys: lti.keysetRoute(),
    },
    "LTIjs is up"
  );
  await lti.registerPlatform({
    url: config.lti.canvasRegUrl,
    name: "GATECH",
    clientId: config.lti.clientIdGatech,
    authenticationEndpoint: `https://${config.lti.ssoHost}/api/lti/authorize_redirect`,
    accesstokenEndpoint: `https://${config.lti.ssoHost}/login/oauth2/token`,
    authConfig: {
      method: "JWK_SET",
      key: `https://${config.lti.ssoHost}/api/lti/security/jwks`,
    },
  });
};
setup();

router.get("/lti", (req, res) => {
  const user =
    req?.res?.locals?.context?.custom?.lis_user_username || "unknown_user";
  const token = res.locals.token;
  logger.debug({ user, token }, "Crosslist LTI launched!");
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

lti.app.use("/", indexRouter);
lti.app.use("/api/", apiRouter);

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

export default app;
