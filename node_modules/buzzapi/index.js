import https from "https";
import isEmpty from "lodash.isempty";
import Debug from "debug";
import delay from "delay";
import Hyperid from "hyperid";
import MakeFetch from "make-fetch-happen";
import os from "os";
import pRetry from "p-retry";
import pThrottle from "p-throttle";
import PQueue from "p-queue";
import BuzzAPIError from "./buzzApiError.js";

const debug = Debug("buzzapi");
const hyperid = Hyperid({ fixedLength: true, urlSafe: true });

https.globalAgent.maxCachedSessions = 0;

const BuzzAPI = function (config) {
  const that = this;

  const queue = new PQueue({ concurrency: 20 });

  this.options = {
    api_app_id: config.apiUser,
    api_app_password: Buffer.from(config.apiPassword).toString("base64"),
    api_request_mode: config.sync ? "sync" : "async",
    api_receive_timeout: config.api_receive_timeout || 900000,
  };

  const server = config.server || "https://api.gatech.edu";

  const throttle = pThrottle({limit: 333, interval: 1000})
  const fetch = throttle(
    MakeFetch.defaults({
      agent: https.globalAgent,
    })
  );

  const unresolved = {};

  this.post = function (resource, operation, data, opts) {
    debug("Options: " + JSON.stringify(that.options));
    return queue.add(() => doPost(resource, operation, data, opts));
  };

  const doPost = (resource, operation, data, opts) =>
    new Promise((res, rej) => {
      const handle =
        data.api_client_request_handle ||
        `${process.pid}@${os.hostname()}-${hyperid()}`;

      const myOpts = {
        method: "POST",
        body: JSON.stringify({
          ...that.options,
          ...data,
          api_client_request_handle: handle,
          ...(opts && opts.paged ? { api_paging_cursor: "START" } : null),
        }),
        headers: { "Content-Type": "application/json" },
      };
      debug("Requesting %s", JSON.stringify(myOpts));
      const url = `${server}/apiv3/${resource}/${operation}`;
      return pRetry(() => fetch(url, myOpts), {
        retries: 5,
        randomize: true,
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((body) => {
            try {
              const parsed = JSON.parse(body);
              body = parsed;
            } catch (err) {}
            return rej(
              new BuzzAPIError(
                `${response.status}: ${response.statusText}`,
                body.api_error_info,
                `${response.status}: ${response.statusText}`,
                body.api_request_messageid,
                { url, options: myOpts }
              )
            );
          });
        }
        return response.json().then(async (json) => {
          if (json.api_error_info) {
            const error = new BuzzAPIError(
              new Error(),
              json.api_error_info,
              json,
              json.api_request_messageid,
              { url, options: myOpts }
            );
            return rej(error);
          } else if (that.options.api_request_mode === "sync") {
            const resultData = await getPages(json, resource, operation, data);
            debug("Sync was set, returning the result");
            return res(resultData);
          } else {
            debug("Got messageId: %s for %s", json.api_result_data, handle);
            unresolved[json.api_result_data] = {
              resolve: res,
              reject: rej,
              initTime: new Date(),
              resource,
              operation,
              data,
            };
            that.options.ticket = json.api_app_ticket;
            return getResult();
          }
        });
      });
    });
  const getPages = function (buzzResponse, resource, operation, data) {
    const unwrapped = buzzResponse.api_result_data.api_result_data
      ? buzzResponse.api_result_data
      : buzzResponse;
    if (
      unwrapped.api_paging_next_cursor &&
      !unwrapped.api_result_is_last_page
    ) {
      debug(
        `Fetching more pages with cursor: ${unwrapped.api_paging_next_cursor}`
      );
      return doPost(resource, operation, {
        ...data,
        api_paging_cursor: unwrapped.api_paging_next_cursor,
      }).then((nextPage) => unwrapped.api_result_data.concat(nextPage));
    }
    return Promise.resolve(unwrapped.api_result_data);
  };

  const resolve = function (messageId, result) {
    debug("size: %s, pending: %s", queue.size, queue.pending);
    const message = unresolved[messageId];
    delete unresolved[messageId];
    return getPages(
      result,
      message.resource,
      message.operation,
      message.data,
      message.myOpts
    )
      .then((pages) => message.resolve(pages))
      .catch((err) => message.reject(err));
  };

  const reject = function (messageId, err) {
    debug("size: %s, pending: %s", queue.size, queue.pending);
    const message = unresolved[messageId];
    delete unresolved[messageId];
    return message.reject(err);
  };

  const cleanupExpired = function () {
    Object.keys(unresolved).forEach((messageId) => {
      if (
        new Date() - unresolved[messageId].initTime >
        that.options.api_receive_timeout
      ) {
        const err = new Error("Request timed out for: " + messageId);
        return reject(messageId, err);
      }
    });
    return;
  };

  const scheduleRetry = function () {
    return delay(Math.floor(Math.random() * 4000 + 1000)).then(() =>
      getResult()
    );
  };

  const getResult = function () {
    cleanupExpired();
    const messageIds = Object.keys(unresolved);
    if (messageIds.length === 0) {
      return new Promise((res) => res());
    }
    const handle = `${process.pid}@${os.hostname()}-${hyperid()}`;
    debug("Asking for result of %s using handle %s", messageIds, handle);
    const url = `${server}/apiv3/api.my_messages`;
    const myOpts = {
      method: "POST",
      body: JSON.stringify({
        api_operation: "read",
        api_app_ticket: that.options.ticket,
        api_pull_response_to: messageIds,
        api_receive_timeout: 5000,
        api_client_request_handle: handle,
      }),
      headers: { "Content-Type": "application/json" },
    };
    return pRetry(() => fetch(url, myOpts), {
      retries: 5,
      randomize: true,
    }).then((response) => {
      if (!response.ok) {
        return scheduleRetry();
      }
      return response.json().then((json) => {
        if (
          json.api_error_info ||
          (json.api_result_data && json.api_result_data.api_error_info)
        ) {
          if (json.api_error_info) {
            const message =
              unresolved[json.api_error_info.api_request_messageid];
            const err = new BuzzAPIError(
              "BuzzApi returned error_info",
              json.api_error_info,
              json,
              json.api_error_info.api_request_messageid,
              { url, options: myOpts }
            );
            debug(unresolved);
            if (message) {
              return reject(json.api_error_info.api_request_messageid, err);
            } else {
              return Promise.reject(err);
            }
          } else if (json.api_result_data) {
            const messageId = json.api_result_data.api_request_messageid;
            const err = new BuzzAPIError(
              "BuzzApi returned error_info",
              json.api_result_data.api_error_info,
              json,
              messageId,
              { url, options: myOpts }
            );
            return reject(messageId, err);
          } else {
            return Promise.reject(
              new BuzzAPIError(
                new Error(),
                json,
                json,
                json.api_request_messageId,
                { url, options: myOpts }
              )
            );
          }
        } else if (isEmpty(json.api_result_data)) {
          // Empty result_data here means our data isn't ready, wait 1 to 5 seconds and try again
          debug("Result not ready for " + messageIds);
          return scheduleRetry();
        } else {
          const messageId = json.api_result_data.api_request_messageid;
          debug("Got result for ", messageId);
          return resolve(messageId, json);
        }
      });
    });
  };
};

export default BuzzAPI;
