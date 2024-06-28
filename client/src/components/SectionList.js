/* eslint-disable react/prop-types */
import React from "react";
import { View } from "@instructure/ui-view";
import Section from "./Section.js";
import "./styles.css";
import isolateSection from "../../../server/routes/handlers/isolateSection.js";

const SectionList = (props) => {
  const {
    sections,
    mySections,
    courseId,
    isTarget,
    pending,
    available,
    published,
    crossListSection,
    unCrossListSection,
  } = props;
  return (
    <View as="div" className="sectionList">
      {mySections
        .sort((a, b) => {
          const sectionA = sections.byId[a];
          const sectionB = sections.byId[b];
          if (sectionA.name < sectionB.name) return -1;
          if (sectionA.name > sectionB.name) return 1;
          return 0;
        })
        .sort((a, b) => {
          const sectionA = sections.byId[a];
          const sectionB = sections.byId[b];
          if (sectionA.nonxlist_course_id === courseId) return -1;
          if (sectionB.nonxlist_course_id === courseId) return 1;
          return 0;
        })
        .map((sectionId) => (
          <Section
            key={sectionId}
            section={sections.byId[sectionId]}
            courseId={courseId}
            crossListSection={() => crossListSection(sectionId, published)}
            unCrossListSection={() => unCrossListSection(sectionId)}
            isTarget={isTarget}
            isPending={pending.includes(sectionId)}
            isAvailable={available.includes(sectionId)}
            isolateSection={isolateSection}
          ></Section>
        ))}
    </View>
  );
};

export default SectionList;
