import { expect } from "chai";
import nock from "nock";

import BuzzApi from "../index.js";
import response from "./response.js";

const buzzapisync = new BuzzApi({ apiUser: "", apiPassword: "", sync: true });
const buzzapi = new BuzzApi({ apiUser: "", apiPassword: "" });

const defaultBody = {
  api_operation: "read",
  api_pull_response_to: ["ABC123"],
  api_app_ticket: "XYZ789",
  api_receive_timeout: 5000,
  api_client_request_handle: /.*/,
};
const api = nock("https://api.gatech.edu");

beforeEach(() => {
  nock.cleanAll();
});

describe("Sync tests", () => {
  it("Gets a resource in a single request", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.sync);
    return buzzapisync.post("test", "test", {}).then((response) => {
      expect(typeof response).to.equal("object");
      expect(response.success);
    });
  });

  it("Handles buzzapi errors", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.syncError);
    return buzzapisync.post("test", "test", {}).catch((err) => {
      expect(typeof err.buzzApiBody).to.equal("object");
      expect(err.buzzApiErrorInfo.success).to.equal(false);
    });
  });

  it("Handles http errors", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(404, "Not Found");
    return buzzapisync.post("test", "test", {}).catch((err) => {
      expect(err.buzzApiBody).to.equal("404: Not Found");
      return expect(err.buzzApiErrorInfo).to.be.empty;
    });
  });

  it("Handles http errors with json bodies", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(503, { api_error_info: "Service unavailable for some time" });
    return buzzapisync.post("test", "test", {}).catch((err) => {
      expect(err.buzzApiBody).to.equal("503: Service Unavailable");
      return expect(err.buzzApiErrorInfo).to.be.equal(
        "Service unavailable for some time"
      );
    });
  });

  it("Handles errors with no body set", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(400);
    return buzzapisync.post("test", "test", {}).catch((err) => {
      expect(err.message).to.equal("400: Bad Request");
      return expect(err.buzzApiBody).to.equal("400: Bad Request");
    });
  });

  it("Gets all pages in a paged request", () => {
    api
      .post("/apiv3/test/test", (body) => {
        return body.api_paging_cursor === "START";
      })
      .reply(200, response.page1);
    api
      .post("/apiv3/test/test", (body) => {
        return body.api_paging_cursor === "PAGE2";
      })
      .reply(200, response.page2);
    return buzzapisync
      .post("test", "test", {}, { paged: true })
      .then((response) => {
        expect(response.length).to.equal(2);
      });
  });

  it("Does not lose requests when opening more than the queuing limit of 20", () => {
    const reqs = api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .times(25)
      .delayConnection(200)
      .reply(200, response.sync);
    const check = (response) => {
      expect(typeof response).to.equal("object");
      expect(response.success);
    };
    const promises = function* (start = 0, end = 24, step = 1) {
      for (let i = start; i < end; i += step) {
        yield buzzapisync.post("test", "test", {});
      }
    };
    return Promise.all([...promises()]).then((res) => res.map(check));
    expect(reqs.isDone());
  }).timeout(6000);
});

describe("Async tests", () => {
  it("Makes a second request to get async messages", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    const aReq = api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncSuccess);
    return buzzapi.post("test", "test", {}).then((response) => {
      expect(typeof response).to.equal("object");
      expect(response.success);
      expect(aReq.isDone());
    });
  });

  it("Gets all pages of async messages", () => {
    api
      .post("/apiv3/test/test", (body) => {
        return body.api_paging_cursor === "START";
      })
      .reply(200, response.asyn);
    api.post("/apiv3/api.my_messages", defaultBody).reply(200, response.page1a);
    api
      .post("/apiv3/test/test", (body) => {
        return body.api_paging_cursor === "PAGE2";
      })
      .reply(200, response.asyn);
    api.post("/apiv3/api.my_messages", defaultBody).reply(200, response.page2a);
    return buzzapi
      .post("test", "test", {}, { paged: true })
      .then((response) => {
        expect(response.length).to.equal(2);
      });
  });

  it("Tries again if async result not ready", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    const nrReq = api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncNotReady);
    api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncSuccess);
    return buzzapi.post("test", "test", {}).then((response) => {
      expect(typeof response).to.equal("object");
      expect(response.success);
      expect(nrReq.isDone());
    });
  }).timeout(6000);

  it("Handles buzzapi errors", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncError);
    return buzzapi.post("test", "test", {}).catch((err) => {
      expect(typeof err.buzzApiBody).to.equal("object");
      expect(err.buzzApiErrorInfo.success).to.equal(false);
    });
  });

  // I don't think this ever happens
  /*  it("Handles buzzapi errors at top level of response", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.syncError);
    return buzzapi.post("test", "test", {}).catch(err => {
      expect(typeof err.buzzApiBody).to.equal("object");
      expect(err.buzzApiErrorInfo.success).to.equal(false);
    });
  }); */

  it("Retries getting results on error", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    api.post("/apiv3/api.my_messages", defaultBody).reply(500);
    api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncSuccess);
    return buzzapi.post("test", "test", {}).then((response) => {
      expect(typeof response).to.equal("object");
      expect(response.success);
    });
  }).timeout(6000);

  it("Gives up retrying a request after reaching the timeout", () => {
    api
      .post("/apiv3/test/test", () => {
        return true;
      })
      .reply(200, response.asyn);
    api
      .post("/apiv3/api.my_messages", defaultBody)
      .reply(200, response.asyncNotReady);
    const defaultTimeout = buzzapi.options.api_receive_timeout;
    buzzapi.options.api_receive_timeout = 1;
    return buzzapi.post("test", "test", {}).catch((err) => {
      buzzapi.options.api_receive_timeout = defaultTimeout;
      expect(err.message).to.equal("Request timed out for: ABC123");
    });
  }).timeout(6000);
});
