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
export const trustProxy = getEnvVarOrDefault("TRUST_PROXY", "loopback");
export const httpLogsFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";

export const buzzAPI = {
  apiUser: getEnvVarOrDefault("BUZZAPI_APP_ID"),
  apiPassword: getEnvVarOrDefault("BUZZAPI_PASSWORD"),
  server: getEnvVarOrThrow("BUZZAPI_URL"),
};
export const canvas = {
  token: getEnvVarOrDefault("CANVAS_TOKEN"),
  lmsApiUrl: getEnvVarOrDefault(
    "CANVAS_LMS_API_URL",
    "https://gatech.test.instructure.com"
  ),
};
export const database = {
  name: getEnvVarOrDefault("DB_NAME", "ltijs_db"),
  user: getEnvVarOrDefault("DB_USER", "postgres"),
  pass: getEnvVarOrDefault("DB_PASS", "postgres"),
  host: getEnvVarOrDefault("DB_HOST", "db"),
};
export const lti = {
  clientIdGatech: getEnvVarOrDefault("CLIENT_ID_GATECH", ""),
  ltiKey: getEnvVarOrDefault("LTI_KEY", ""),
  ssoHost: getEnvVarOrDefault("LTI_SSO_HOST", "sso.test.canvaslms.com"),
  canvasRegUrl: getEnvVarOrDefault(
    "CANVAS_REG_URL",
    "https://canvas.instructure.com"
  ),
};

const config = {
  httpLogsFormat,
  trustProxy,
  buzzAPI,
  canvas,
  lti,
  database,
};

export default config;
