import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { is } from '@bill.kampouroudis/js-utils';
import EventForm from '../../forms/EventForm/EventForm';

function EventModal(props) {
  const {
    show, onClose, event, selectedDate, day, onRefreshEvents
  } = props;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {is.emptyObject(event) ? 'Create Event' : 'Edit Event'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EventForm selectedDate={selectedDate} day={day} onSuccess={onRefreshEvents} />
      </Modal.Body>
    </Modal>
  );
}

EventModal.defaultProps = {
  event: {}
};

EventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object,
  selectedDate: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
  onRefreshEvents: PropTypes.func.isRequired
};

export default EventModal;
