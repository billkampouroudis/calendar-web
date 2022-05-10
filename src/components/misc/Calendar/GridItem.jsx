import React from 'react';
import PropTypes from 'prop-types';

function GridItem(props) {
  // eslint-disable-next-line no-unused-vars
  const { day, month, year } = props;

  return (
    <div key={day} className="grid-item">
      {day}
    </div>
  );
}

GridItem.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default GridItem;
