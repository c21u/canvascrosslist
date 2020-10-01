/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';

export default function SectionList(props) {
  const {
    sections,
    mySections,
    courseId,
    isTarget,
    pending,
    available,
    published,
    xlist,
    unxlist,
  } = props;
  return (
    <ul>
      {mySections
        .sort((a, b) => {
          // First sort in alphabetical order
          const sectionA = sections.byId[a];
          const sectionB = sections.byId[b];
          if (sectionA.name < sectionB.name) return -1;
          if (sectionA.name > sectionB.name) return 1;
          return 0;
        })
        .sort((a, b) => {
          // Second sort to ensure the primary section is sorted first.
          const sectionA = sections.byId[a];
          const sectionB = sections.byId[b];
          if (sectionA.nonxlist_course_id === courseId) return -1;
          if (sectionB.nonxlist_course_id === courseId) return 1;
          return 0;
        })
        .map(sectionId => (
          <Section
            key={sectionId}
            section={sections.byId[sectionId]}
            courseId={courseId}
            xlistOnClick={() => xlist({ sectionId, published })}
            unxlistOnClick={() => unxlist({ sectionId })}
            isTarget={isTarget}
            isPending={pending.includes(sectionId)}
            isAvailable={available.includes(sectionId)}
          />
        ))}
    </ul>
  );
}

SectionList.propTypes = {
  sections: PropTypes.shape({
    byId: PropTypes.object.isRequired,
    allIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  courseId: PropTypes.string.isRequired,
  isTarget: PropTypes.bool.isRequired,
  pending: PropTypes.arrayOf(PropTypes.string).isRequired,
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  mySections: PropTypes.arrayOf(PropTypes.string).isRequired,
  published: PropTypes.bool.isRequired,
  xlist: PropTypes.func.isRequired,
  unxlist: PropTypes.func.isRequired,
};
