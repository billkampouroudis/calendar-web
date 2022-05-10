import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

function DatePicker(props) {
  const { onSelectDate } = props;

  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    onSelectDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="date-picker">
      <ArrowLeftCircleFill
        onClick={() => { setSelectedDate(selectedDate.clone().subtract(1, 'M')); }}
      />

      <b className="text-center" style={{ width: '150px' }}>
        {selectedDate.format('MM-YYYY')}
      </b>

      <ArrowRightCircleFill
        onClick={() => { setSelectedDate(selectedDate.clone().add(1, 'M')); }}
      />
    </div>
  );
}

DatePicker.propTypes = {
  onSelectDate: PropTypes.func.isRequired
};

export default DatePicker;
