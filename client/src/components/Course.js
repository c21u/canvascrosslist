/* eslint-disable react/prop-types */
import React from "react";
import { View } from "@instructure/ui-view";
import SectionList from "./SectionList";
// import { Link } from "@instructure/ui-link";
import "./styles.css";

const Course = (props) => {
  const {
    courseId,
    course,
    setCrossListTarget,
    isTarget,
    targetExists,
    pending,
    available,
    sections,
    crossListSection,
    unCrossListSection,
  } = props;
  return (
    <View
      as="div"
      className="course"
      id={targetExists && isTarget ? "targeted" : ""}
    >
      <View as="div" className="courseHeader">
        <h2>{course.name}</h2>
        {!isTarget ? (
          <button onClick={setCrossListTarget} className="manageButton">
            Manage
          </button>
        ) : (
          <h3 className="targetedText">TARGETED</h3>
        )}
      </View>
      <View as="div" className="courseSubHeader">
        <View as="div" className="primarySection">
          <h3>
            {course.course_code} - {course.sis_course_id}
          </h3>
          <br></br>
          {targetExists && isTarget ? (
            <p>
              The managed section is the primary course section and should be
              the section that has the most certain or largest projected
              enrollments.
            </p>
          ) : (
            ""
          )}
        </View>
        <View as="div" className="studentsLoggedIn">
          <p>
            {course.recent_students} student
            {course.recent_students === 1 ? " has " : "s have "}
            logged in to this course.
          </p>
        </View>
      </View>
      <SectionList
        sections={sections}
        mySections={course.sections}
        courseId={courseId}
        isTarget={isTarget}
        pending={pending}
        available={available}
        published={course.workflow_state !== "unpublished"}
        crossListSection={crossListSection}
        unCrossListSection={unCrossListSection}
      />
    </View>
  );
};

export default Course;
