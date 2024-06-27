import dotenv from "dotenv";
dotenv.config();
import logger from "./lib/logger.js";

const getEnvVarOrDefault = (envVar, defaultValue) => {
  defaultValue = defaultValue || "CHANGEME";
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    logger.warn(`${envVar} not set: using default ${defaultValue}`);
    return defaultValue;
  }
};

const getEnvVarOrNull = (envVar) => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    return null;
  }
};

const getEnvVarOrThrow = (envVar) => {
  if (!!process.env[envVar]) {
    return process.env[envVar];
  } else {
    const err = new Error(`Unrecoverable: missing process.env.${envVar}`);
    logger.error(err);
    throw err;
  }
};

export const environment = getEnvVarOrDefault("ENVIRONMENT", "test");
export const sentryDSN = getEnvVarOrNull("SENTRY_DSN");
export const googleAnalyticsID = getEnvVarOrNull("GOOGLE_ANALYTICS_ID");
export const jwtSecret = getEnvVarOrDefault("JWT_SECRET");
export const trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");
export const AWS = {
  region: getEnvVarOrDefault("AWS_REGION", "us-east-1"),
  credentials: {
    accessKeyId: getEnvVarOrNull("AWS_ACCESS_KEY_ID_DEFAULT"),
    secretAccessKey: getEnvVarOrNull("AWS_SECRET_ACCESS_KEY_DEFAULT"),
  },
};
export const AWS_SQS = {
  region: getEnvVarOrDefault("AWS_REGION", "us-east-1"),
  credentials: {
    accessKeyId: getEnvVarOrNull("AWS_ACCESS_KEY_ID_SQS"),
    secretAccessKey: getEnvVarOrNull("AWS_SECRET_ACCESS_KEY_SQS"),
  },
};
export const SQS_QUEUE_URLS = {
  webwork: getEnvVarOrNull("SQS_QUEUE_URL_WEBWORK"),
};
export const httpLogsFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";

export const buzzAPI = {
  apiUser: getEnvVarOrDefault("BUZZAPI_APP_ID"),
  apiPassword: getEnvVarOrDefault("BUZZAPI_PASSWORD"),
  server: getEnvVarOrThrow("BUZZAPI_URL"),
};
export const canvas = {
  token: getEnvVarOrDefault("CANVAS_TOKEN"),
  host: getEnvVarOrDefault("CANVAS_URL", "gatech.test.instructure.com"),
  lmsApiUrl: getEnvVarOrDefault(
    "CANVAS_LMS_API_URL",
    "https://gatech.test.instructure.com"
  ),
  sandboxAccount: getEnvVarOrDefault("CANVAS_SANDBOX_ACCOUNT", 40),
};
export const lti = {
  key: getEnvVarOrThrow("LTI_KEY"),
  secret: getEnvVarOrThrow("LTI_SECRET"),
};

export const fakeStrategyCredentials = {};
if (process.env.NODE_ENV === "test") {
  logger.warn(`Fake auth strategy enabled!`);
  fakeStrategyCredentials.username = getEnvVarOrDefault("FAKE_USERNAME");
  fakeStrategyCredentials.password = getEnvVarOrDefault("FAKE_PASSWORD");
  config["passportStrategy"] = "fake";
}
export const passportStrategy =
  process.env.NODE_ENV === "test" ? "fake" : "lti";

export const lambdas = {
  runEnroller: "RunCanvasEnrollerFull",
};

const config = {
  sentryDSN,
  passportStrategy,
  fakeStrategyCredentials,
  httpLogsFormat,
  googleAnalyticsID,
  jwtSecret,
  trustProxy,
  AWS,
  buzzAPI,
  canvas,
  lti,
  lambdas,
  AWS_SQS,
  SQS_QUEUE_URLS,
};

export default config;
