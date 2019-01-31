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

class SectionList extends React.Component {
  static propTypes = {
    sections: PropTypes.shape({
      byId: PropTypes.object.isRequired,
      allIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    sisCourseId: PropTypes.string.isRequired,
    xlist: PropTypes.func.isRequired,
    unxlist: PropTypes.func.isRequired,
    isTarget: PropTypes.bool.isRequired,
    pending: PropTypes.arrayOf(PropTypes.string).isRequired,
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    mySections: PropTypes.arrayOf(PropTypes.string).isRequired,
    recentStudentsCount: PropTypes.number.isRequired,
  };

  render() {
    const {
      sections,
      mySections,
      sisCourseId,
      xlist,
      unxlist,
      isTarget,
      pending,
      available,
      recentStudentsCount,
    } = this.props;
    return (
      <ul>
        {mySections.map(sectionId => (
          <Section
            key={sectionId}
            section={sections.byId[sectionId]}
            sisCourseId={sisCourseId}
            xlistOnClick={() => xlist(sectionId, recentStudentsCount)}
            unxlistOnClick={() => unxlist(sectionId)}
            isTarget={isTarget}
            isPending={pending.includes(sectionId)}
            isAvailable={available.includes(sectionId)}
          />
        ))}
      </ul>
    );
  }
}

export default SectionList;
