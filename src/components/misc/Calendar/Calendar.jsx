import React, { useState } from 'react';
import GridItems from './GridItems';
import DatePicker from './DatePicker';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <>
      <DatePicker onSelectDate={setSelectedDate} />
      {
        selectedDate
          ? <GridItems selectedDate={selectedDate} />
          : null
      }
    </>
  );
}

export default Calendar;
