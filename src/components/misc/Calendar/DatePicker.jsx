import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { is } from '@bill.kampouroudis/js-utils';

function DatePicker(props) {
  const { onSelectDate } = props;

  const [selectedDate, setSelectedDate] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigateToDate = (date) => {
    setSelectedDate(date);
    navigate(`${location.pathname}?date=${date.format('MM')}-${date.year()}`);
  };

  useEffect(() => {
    if (!is.emptyObject(selectedDate)) {
      onSelectDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    const date = searchParams.get('date');
    const momentDate = moment(date, 'MM-YYYY');

    if (momentDate.isValid()) {
      setSelectedDate(momentDate);
    } else {
      setSelectedDate(moment());
    }
  }, []);

  if (is.emptyObject(selectedDate)) {
    return null;
  }

  return (
    <div className="date-picker">
      <ArrowLeftCircleFill
        onClick={() => {
          const newDate = selectedDate.clone().subtract(1, 'M');
          navigateToDate(newDate);
        }}
      />

      <div className="text-center">
        <div className="fw-bold mb-1" style={{ width: '150px' }}>
          {selectedDate.format('MM-YYYY')}
        </div>
      </div>

      <ArrowRightCircleFill
        onClick={() => {
          const newDate = selectedDate.clone().add(1, 'M');
          navigateToDate(newDate);
        }}
      />
    </div>
  );
}

DatePicker.propTypes = {
  onSelectDate: PropTypes.func.isRequired
};

export default DatePicker;
