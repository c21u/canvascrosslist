/* eslint-disable react/prop-types */
import React from "react";
import { View } from "@instructure/ui-view";
import Section from "./Section.js";
import "./styles.css";

const SectionList = (props) => {
  const {
    sections,
    mySections,
    courseId,
    isTarget,
    collapsed,
    pending,
    available,
    published,
    crossListSection,
    unCrossListSection,
    crn,
  } = props;

  return (
    <View
      as="div"
      className="sectionList"
      id={collapsed ? "sectionListCollapsed" : ""}
    >
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
            crossListSection={() => crossListSection(sectionId, crn, published)}
            unCrossListSection={() => unCrossListSection(sectionId, crn)}
            isTarget={isTarget}
            isPending={pending.includes(sectionId)}
            isAvailable={available.includes(sectionId)}
          ></Section>
        ))}
    </View>
  );
};

export default SectionList;
