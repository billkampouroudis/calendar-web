import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { is } from '@bill.kampouroudis/js-utils';
import urls from '../../../pages/router/Urls';

function GridItem(props) {
  const { day, events } = props;

  const renderEvents = () => events.map((event) => {
    const date = moment(event.attributes.dateTime);

    return (
      <div key={event.id} className="event-title-container">
        <div className="truncate text-sm">
          <small className="fw-light text-muted">
            {date.format('hh:mma')}
          </small>
          {' '}
          <small>
            {event.attributes.title}
          </small>
        </div>
      </div>
    );
  });

  return (
    <div key={day} className="grid-item">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span>
          {is.falsy(events) ? day : (
            <NavLink to={`${urls.DAY_SCHEDULE}/${day}-${moment().format('MM')}-${moment().year()}`}>
              {day}
            </NavLink>
          )}

        </span>

        <PlusCircleFill className="text-primary cursor-pointer click-effect" style={{ fontSize: '18px' }} />
      </div>

      {renderEvents()}
    </div>
  );
}

GridItem.propTypes = {
  day: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};

export default GridItem;
