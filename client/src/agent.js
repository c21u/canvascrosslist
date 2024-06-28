import superagent from "superagent";
import jwtDecode from "jwt-decode";
import qs from "qs";

const queryParameters = window.location.search;

const parseQueryParams = (item) => {
  if (!item) {
    return false;
  }
  try {
    return qs.parse(queryParameters, { ignoreQueryPrefix: true })[item];
  } catch (err) {
    console.log(err);
  }
};

const API_ROOT = "/api";

const handleErrors = (err) => {
  return err;
};

const responseBody = (res) => res.body;

// const tokenPlugin = (req) => {
//   if (commonStore.jwt) {
//     req.set("Authorization", `Bearer ${commonStore.jwt}`);
//   }
// };
const tokenPlugin = (req) => {
  let jwt;
  const token = parseQueryParams("token");
  try {
    jwtDecode(token);
    jwt = token;
    req.set("Authorization", `Bearer ${jwt}`);
  } catch (err) {
    console.log(err);
  }
};

const requests = {
  get: (url) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody);
  },
  post: (url, body) => {
    return superagent
      .post(`${API_ROOT}${url}`)
      .send(body)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody);
  },
  put: (url, body) => {
    return superagent
      .put(`${API_ROOT}${url}`)
      .send(body)
      .use(tokenPlugin)
      .then(handleErrors)
      .then(responseBody);
  },
};

const test = {
  post: () => requests.post("/test"),
};

const courses = {
  get: () => requests.post("/get-courses", {}),
  crosslist: (body) => requests.post("/crosslist-section", body),
  uncrosslist: (body) => requests.post("/uncrosslist-section", body),
  isolateSection: (body) => requests.post("/isolate-section", body),
};
export default {
  test,
  courses,
};
