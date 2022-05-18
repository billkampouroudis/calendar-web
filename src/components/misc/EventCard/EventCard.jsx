import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PersonFill, GeoAltFill, InfoCircleFill } from 'react-bootstrap-icons';
import EventModal from '../../modals/EventModal/EventModal';

function EventCard(props) {
  const { event, onRefreshEvents } = props;

  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <>
      <Card className="mb-3 cursor-pointer" onClick={() => setShowEventModal(true)}>
        <Card.Body>
          <Card.Title as="h5">
            {event.attributes.title}
          </Card.Title>

          <Card.Text as="div">
            <div className="text-muted mb-2">
              {moment(event.attributes.dateTime).format('dddd, DD-MM-YYYY, HH:mma')}
            </div>

            {/* Event Location */}
            {
              event.attributes.place ? (
                <div className="m-0 mt-2 d-flex align-items-center">
                  <GeoAltFill className="me-1 text-primary" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
                  {event.attributes.place}
                </div>
              ) : null
            }

            {/* Event Attendees */}
            {
              event.attributes.attendees ? (
                <div className="m-0 mt-2 d-flex align-items-center">
                  <PersonFill className="me-1 text-primary" style={{ fontSize: '1.1rem', flexShrink: 0 }} />
                  {event.attributes.attendees}
                </div>
              ) : null
            }

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

      {
        showEventModal ? (
          <EventModal
            show={showEventModal}
            onClose={() => setShowEventModal(false)}
            onRefreshEvents={() => {
              setShowEventModal(false);
              onRefreshEvents();
            }}
            day={moment(event.attributes.dateTime).date()}
            selectedDate={moment(event.attributes.dateTime)}
            event={event}
          />
        ) : null
      }

    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onRefreshEvents: PropTypes.func.isRequired
};

export default EventCard;
