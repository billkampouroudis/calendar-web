import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { toast } from 'react-toastify';
// import moment from 'moment';
import GridItem from './GridItem';
import { getUser } from '../../../utils/user';
import eventApi from '../../../api/eventApi';

function GridItems(props) {
  const { selectedDate } = props;

  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  const user = getUser();

  const daysInMonth = selectedDate.daysInMonth();
  const daysOfTheMonth = [...Array(daysInMonth).keys()].map((x) => x + 1); // Creates an array that contains the days of the current month

  useEffect(() => {
    const query = qs.stringify({
      filters: {
        users_permissions_user: {
          id: {
            $eq: user.id
          }
        },
        dateTime: {
          $gte: new Date(`01 ${selectedDate.format('MMMM')} ${selectedDate.year()} 00:00 UTC`).toISOString(),
          $lte: new Date(`${daysInMonth} ${selectedDate.format('MMMM')} ${selectedDate.year()} 00:00 UTC`).toISOString()
        }
      },
      pagination: {
        pageSize: 999999
      }
    }, {
      encodeValuesOnly: true
    });

    eventApi.find({ query })
      .then((res) => setEvents(res.data.data.map((event) => event.attributes)))
      .catch(() => toast.error('There was an error while trying to fetch the your events.'));
  }, []);

  return (
    <div className="grid-container">
      {daysOfTheMonth.map((day) => (
        <GridItem
          key={day}
          day={day}
          month={selectedDate.month() + 1}
          year={selectedDate.year()}
          events={events}
        />
      ))}
    </div>
  );
}

GridItems.propTypes = {
  selectedDate: PropTypes.object.isRequired
};

export default GridItems;
