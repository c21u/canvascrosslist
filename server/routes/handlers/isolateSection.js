import logger from "../../lib/logger.js";

export default (Buzz, Canvas) => (req) => {
  if (!req.body || !req.body.termCode || !req.body.crn) {
    const message = "Required parameters missing.";
    logger.error(message);
    return Promise.resolve({ status: "fail", data: message });
  }

  const termCode = req.body.termCode;
  const crn = req.body.crn;

  logger.info(
    `POST to /isolate-sections: {termCode: ${termCode}, crn: ${crn}}`
  );

  return Canvas.listSisUserIds(termCode, crn)
    .then((sisUserIds) => {
      return Buzz.isolateSection(termCode, crn)
        .then(() => {
          logger.info(`Isolated section ${termCode}/${crn}`);
          return Buzz.markUsersForUpdate(sisUserIds);
        })
        .then(() => {
          logger.info(
            `Created batch update work items for ${sisUserIds.length} user(s).`
          );
          return {
            status: "success",
            data: { isolatedSection: { termCode, crn } },
          };
        });
    })
    .catch((err) => {
      logger.error(
        {
          name: err.name,
          buzzApiErrorInfo: err.buzzApiErrorInfo,
        },
        `${err.message}`
      );
      return {
        status: "error",
        message: "Something went wrong in the server side request.",
      };
    });
};
