import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PersonFill, GeoAltFill, InfoCircleFill } from 'react-bootstrap-icons';

function EventCard(props) {
  const { event } = props;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title as="h5">
          {event.attributes.title}
        </Card.Title>

        <Card.Text as="div">
          <div className="text-muted mb-2">
            {moment(event.attributes.dateTime).format('dddd, DD-MM-YYYY')}
          </div>

          {/* Event Location */}
          <div className="mb-2 d-flex align-items-center">
            <GeoAltFill className="me-1 text-primary" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
            {event.attributes.place}
          </div>

          {/* Event Attendees */}
          <div className="d-flex align-items-center">
            <PersonFill className="me-1 text-primary" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
            {event.attributes.attendees}
          </div>

          {/* Event description */}
          {
            event.attributes.description ? (
              <p className="m-0 mt-2 d-flex align-items-center">
                <InfoCircleFill className="me-1 text-primary" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
                {event.attributes.description}
              </p>
            ) : null
          }

        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventCard;
