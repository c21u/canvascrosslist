/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Modal } from "@instructure/ui-modal";
import SectionList from "./SectionList";
import { Spinner } from "@instructure/ui-spinner";
import { IconArrowOpenDownSolid } from "@instructure/ui-icons";
import { IconArrowOpenUpSolid } from "@instructure/ui-icons";
import "./styles.css";
import agent from "../agent.js";

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
    termCode,
    crn,
  } = props;

  const [isolateButtonReady, setIsolateButtonReady] = useState(false);
  const [action, setAction] = useState("create");
  const [isolateConfirmModal, setIsolateConfirmModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (termCode && crn) {
      agent.courses
        .checkSectionIsolation({ termCode, crn })
        .then((res) => {
          if (res.course_attributes.length > 0) {
            res.course_attributes.map((attr) => {
              if (attr.attr_code == "ISOL") {
                setAction("delete");
                setIsolateButtonReady(true);
                return;
              } else {
                setIsolateButtonReady(true);
              }
            });
          } else {
            setIsolateButtonReady(true);
          }
        })
        .catch((err) => {
          setIsolateButtonReady(true);
          console.log(err);
        });
    }
  }, []);

  const isolateSection = (termCode, crn, action) => {
    agent.courses
      .isolateSection({ termCode, crn, action })
      .then((res) => {
        setAction((action) => {
          return action == "create" ? "delete" : "create";
        });
        setIsolateConfirmModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      as="div"
      className="course"
      id={targetExists && isTarget ? "targeted" : ""}
    >
      <View as="div" className="courseHeader">
        <h2>{course.name}</h2>
        {isolateButtonReady ? (
          <button
            className="isolateButton"
            onClick={() => {
              setIsolateConfirmModal(true);
            }}
          >
            {action == "create" ? "Isolate" : ""}
            {action == "delete" ? "Unisolate" : ""}
          </button>
        ) : (
          <div style={{ paddingTop: "20px", marginRight: "20px" }}>
            <Spinner size="x-small" />
          </div>
        )}
        {!isTarget ? (
          <button onClick={setCrossListTarget} className="manageButton">
            Manage
          </button>
        ) : (
          <h3 className="targetedText">TARGETED</h3>
        )}
      </View>
      <View
        as="div"
        className={collapsed ? "courseSubHeaderCollapsed" : "courseSubHeader"}
      >
        <View as="div" className="primarySection">
          <h3>
            {course.course_code} - {course.sis_course_id}
          </h3>
        </View>
        <View as="div" className="studentsLoggedIn">
          <p>
            {course.recent_students} student
            {course.recent_students === 1 ? " has " : "s have "}
            logged in to this course.
          </p>
        </View>
        <div
          style={{
            display: isTarget ? "block" : "none",
            textAlign: "right",
            marginTop: "-30px",
            fontSize: "0.8em",
          }}
        >
          <button
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
          >
            <span
              style={{
                display: "inlineBlock",
                color: "#54585A",
                fontSize: "0.8em",
              }}
            >
              {collapsed ? (
                <IconArrowOpenDownSolid />
              ) : (
                <IconArrowOpenUpSolid />
              )}
            </span>{" "}
            <span style={{ display: "inlineBlock" }}>
              {collapsed ? "Expand" : "Collapse"}
            </span>
          </button>
        </div>
      </View>
      <SectionList
        sections={sections}
        mySections={course.sections}
        courseId={courseId}
        isTarget={isTarget}
        collapsed={collapsed}
        pending={pending}
        available={available}
        published={course.workflow_state !== "unpublished"}
        crossListSection={crossListSection}
        unCrossListSection={unCrossListSection}
      />
      <Modal
        as="form"
        open={isolateConfirmModal}
        onDismiss={() => {
          setIsolateConfirmModal(false);
        }}
        size="auto"
        label="Confirm Isolate Section"
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          <h3 className="isolateModalHeader">
            Section Isolation for <span>{course.sis_course_id}</span>
          </h3>
        </Modal.Header>
        <Modal.Body>
          <View as="div" className="isolateModalBody">
            <p>
              This sections in this course are currently{" "}
              <span>{action == "create" ? "NOT" : ""} Isolated. </span>
              Isolating combined sections will limit users only to see and
              interact with users enrolled in the same section.
            </p>
          </View>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setIsolateConfirmModal(false);
            }}
          >
            Close
          </button>
          <button
            className="isolateConfirmButton"
            onClick={() => isolateSection(termCode, crn, action)}
          >
            {action == "create" ? "Isolate" : ""}
            {action == "delete" ? "Unisolate" : ""}
          </button>
        </Modal.Footer>
      </Modal>
    </View>
  );
};

export default Course;
