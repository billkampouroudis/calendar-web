import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { toast } from 'react-toastify';
import moment from 'moment';
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
    });

    // Fetch all the events of this month
    eventApi.find({ query })
      .then((res) => setEvents(res.data.data))
      .catch(() => toast.error('There was an error while trying to fetch the your events.'));
  }, [selectedDate]);

  return (
    <div className="grid-container">
      {daysOfTheMonth.map((day) => (
        <GridItem
          key={day}
          day={day}
          events={(() => {
            const eventsForThisDay = [];
            for (const event of events) {
              const eventDate = moment(event.attributes.dateTime);

              // Kepp only events that match the current grid item's day and month
              if (eventDate.month() === selectedDate.month() && eventDate.date() === day) {
                eventsForThisDay.push(event);
              }
            }

            return eventsForThisDay;
          })()}
        />
      ))}
    </div>
  );
}

GridItems.propTypes = {
  selectedDate: PropTypes.object.isRequired
};

export default GridItems;
