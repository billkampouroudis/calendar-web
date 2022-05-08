import moment from 'moment';
import React from 'react';
import GridItems from './GridItems';

function Calendar() {
  const daysInMonth = moment().daysInMonth();

  return (
    <div className="grid-container">
      <GridItems daysInMonth={daysInMonth} />
    </div>
  );
}

export default Calendar;
