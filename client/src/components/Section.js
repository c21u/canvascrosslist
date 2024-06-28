/* eslint-disable react/prop-types */
import React from "react";
import { View } from "@instructure/ui-view";
import { Spinner } from "@instructure/ui-spinner";
import "./styles.css";

const Section = (props) => {
  const {
    section,
    courseId,
    crossListSection,
    unCrossListSection,
    isTarget,
    isPending,
    isAvailable,
    isolateSection,
  } = props;

  const termCode = "";
  const crn = "";

  return (
    <View as="div" className="section">
      <h3>{section.name}</h3>
      {isAvailable && !isPending ? (
        <button
          className="combineButton"
          onClick={() => {
            crossListSection();
          }}
        >
          Combine
        </button>
      ) : (
        ""
      )}
      {isTarget &&
      !isPending &&
      section.nonxlist_course_id &&
      courseId !== section.nonxlist_course_id ? (
        <button
          className="separateButton"
          onClick={() => {
            unCrossListSection();
          }}
        >
          Separate
        </button>
      ) : (
        ""
      )}
      <button
        className="isolateButton"
        onClick={() => isolateSection(termCode, crn)}
      >
        Isolate
      </button>
      {isPending ? <Spinner size="x-small" /> : ""}
    </View>
  );
};

export default Section;
