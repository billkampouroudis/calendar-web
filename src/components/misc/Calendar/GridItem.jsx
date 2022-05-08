import React from 'react';
import PropTypes from 'prop-types';

function GridItem(props) {
  const { day } = props;

  return (
    <div key={day} className="grid-item">
      {day}
    </div>
  );
}

GridItem.propTypes = {
  day: PropTypes.number.isRequired
};

export default GridItem;
