/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Modal } from "@instructure/ui-modal";
import SectionList from "./SectionList";
import { Spinner } from "@instructure/ui-spinner";
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

  useEffect(() => {
    if (termCode && crn) {
      console.log(termCode, crn);
      // check if section has "ISOL" attribute in buzzapi
      agent.courses
        .checkSectionIsolation({ termCode, crn })
        .then((res) => {
          console.log(`${termCode}-${crn}`, res);
          if (res.course_attributes.length > 0) {
            res.course_attributes.map((attr) => {
              if (attr.attr_code == "ISOL") {
                setAction("delete");
                setIsolateButtonReady(true);
                return;
              } else {
                setIsolateButtonReady(true);
                console.log("did not find ISOL");
              }
            });
          } else {
            console.log("setting isolate button to true");
            setIsolateButtonReady(true);
          }
        })
        .catch((err) => {
          setIsolateButtonReady(true);
          console.log(err);
        });
    } else {
      console.log("no sis course id found for this course");
    }
  }, []);

  const isolateSection = (termCode, crn, action) => {
    console.log("Running isolate section!", termCode, crn, action);
    agent.courses
      .isolateSection({ termCode, crn, action })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const getSaved = (saveState, id) => {
//     if (saveState) {
//       if (saveState === "saving") {
//         return <div>Saving changes...</div>;
//       }
//       return (
//         <div>
//           Changes saved -{" "}
//           <button
//             /* eslint-disable-next-line no-return-assign */
//             // onClick={() =>
//             //   (window.parent.location = `https://${canvasUrl}/courses/${id}/settings`)
//             // }
//             to="#"
//           >
//             Edit Course Name
//           </button>
//         </div>
//       );
//     }
//     return null;
//   };

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
            // onClick={() => isolateSection(termCode, crn, action)}
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
      <View as="div" className="courseSubHeader">
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
      </View>
      {/* {getSaved(course.saveState, courseId)} */}
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
      <Modal
        as="form"
        open={isolateConfirmModal}
        onDismiss={() => {
          setIsolateConfirmModal(false);
        }}
        // onSubmit={() => console.log("isolate button pressed!!")}
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
              This section is currently{" "}
              <span>{action == "create" ? "NOT" : ""} Isolated. </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
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
            // type="submit"
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
