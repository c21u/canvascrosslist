// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Generate alphanumeric string of given length.
 * @param {number} length
 * @return {string}
 */
const randomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Login command to replicate LTI authentication.
 */
Cypress.Commands.add("login", (context) => {
  /* Configure defaults */
  const appUrl = Cypress.env("APP_URL");
  const httpMethod = "POST";
  const customCourseId = context.courseId || "";
  const customSisId = context.sisId || "";
  const customUsername = context.username || "";
  const oauthConsumerKey = Cypress.env("LTI_KEY");
  const oauthConsumerSecret = Cypress.env("LTI_SECRET");
  const roles = context.roles;

  /* Set default parameters */
  const parameters = {
    custom_canvas_course_id: customCourseId,
    custom_lis_person_sourcedid: customSisId,
    custom_lis_user_username: customUsername,
    lti_message_type: "basic-lti-launch-request",
    lti_version: "LTI-1p0",
    oauth_consumer_key: oauthConsumerKey,
    oauth_nonce: randomString(16),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(new Date().getTime() / 1000),
    oauth_version: "1.0",
    resource_link_id: randomString(8),
    roles: roles,
  };

  /* Generate signature. */
  const signature = require("oauth-signature").generate(
    httpMethod,
    appUrl,
    parameters,
    oauthConsumerSecret,
    null,
    { encodeSignature: false }
  );
  /* Add signature to the parameters. */
  parameters.oauth_signature = signature;

  const req = {};
  req.body = parameters;
  req.followRedirect = false;
  req.form = true;
  req.method = httpMethod;
  req.url = appUrl;
  cy.request(req);
});

Cypress.Commands.add("visitRedirect", (response) =>
  cy.visit(response.redirectedToUrl)
);
