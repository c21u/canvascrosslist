import BuzzAPI from "buzzapi";
import { buzzAPI as cfg } from "../config.js";
import logger from "../lib/logger.js";

const Buzz = {};

try {
  const buzzApi = new BuzzAPI(cfg);

  Buzz.isolateSection = (termCode, crn) => {
    return buzzApi.post("central.academics.sis.section_attributes", "create", {
      term_code: termCode,
      crn: crn,
      attr_code: "ISOL",
    });
  };
} catch (reason) {
  logger.error({ err: reason });
}

export default Buzz;
