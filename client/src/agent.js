import superagent from "superagent";

const API_ROOT = "/api";

const handleErrors = (err) => {
  return err;
};

const responseBody = (res) => res.body;

const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ltik = searchParams.get("ltik");
  if (!ltik) throw new Error("Missing lti key.");
  return ltik;
};

const tokenPlugin = (req) => {
  try {
    req.set("Authorization", `Bearer ${getLtik()}`);
  } catch (reason) {
    console.error(reason);
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
      .post(`${API_ROOT}${url}`, body)
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
  checkSectionIsolation: (body) =>
    requests.post("/check-section-isolation", body),
};
export default {
  test,
  courses,
};
