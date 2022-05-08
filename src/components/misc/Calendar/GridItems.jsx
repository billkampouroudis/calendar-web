import React from 'react';
import PropTypes from 'prop-types';
import GridItem from './GridItem';

function GridItems(props) {
  const { daysInMonth } = props;

  const daysOfTheMonth = [...Array(daysInMonth).keys()].map((x) => x + 1); // Creates an array that contains the days of the current month

  return (
    daysOfTheMonth.map((day) => <GridItem key={day} day={day} />)
  );
}

GridItems.propTypes = {
  daysInMonth: PropTypes.number.isRequired
};

export default GridItems;
