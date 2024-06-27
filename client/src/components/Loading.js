import React from "react";
import { Spinner } from "@instructure/ui-spinner";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @return {element}
 */
function Loading(props) {
  if (props.pastDelay) {
    return <Spinner renderTitle="Loading..." />;
  } else {
    return null;
  }
}
Loading.propTypes = {
  pastDelay: PropTypes.bool,
};

export default Loading;
