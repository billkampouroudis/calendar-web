import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import { is } from '@bill.kampouroudis/js-utils';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moment from 'moment';
import eventApi from '../../../api/eventApi';
import { getUser } from '../../../utils/user';
import zeroPad from '../../../utils/zeroPad';

function EventForm(props) {
  const {
    event, selectedDate, day, onSuccess
  } = props;

  const [title, setTitle] = useState('');
  const [attendees, setAttendees] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('43200'); // 12:00

  const user = getUser();

  const onSubmit = (e) => {
    e.preventDefault();

    const hours = zeroPad(parseInt(time / 3600, 10), 2);
    const minutes = (time % 3600) / 60;

    const values = {
      data: {
        title,
        attendees,
        place,
        description,
        dateTime: new Date(
          `${day} ${selectedDate.format('MMMM')} ${selectedDate.year()} ${hours}:${minutes}`
        ).toISOString(),
        creatorId: user.id
      }
    };

    if (is.emptyObject(event)) {
      eventApi.create({ ...values })
        .then(() => {
          toast.success('The event was created!');
          onSuccess();
        })
        .catch(() => toast.success('There was an error while saving the event'));
    } else {
      eventApi.update(event.id, { ...values })
        .then(() => {
          toast.success('The event was updated!');
          onSuccess();
        })
        .catch(() => toast.error('There was an error while updating the event'));
    }
  };

  const onDelete = () => {
    eventApi.delete(event.id)
      .then(() => {
        toast.success('The event was deleted!');
        onSuccess();
      })
      .catch(() => toast.error('The event can not be deleted'));
  };

  useEffect(() => {
    if (!is.emptyObject(event)) {
      const eventDate = moment(event.attributes.dateTime);
      const finalTime = Number(eventDate.format('HH')) * 3600
        + Number(eventDate.format('mm')) * 60
        + Number(eventDate.format('ss')); // Needs to be converted that way in order for the time picker to work correctly

      setTitle(event.attributes.title || '');
      setAttendees(event.attributes.attendees || '');
      setPlace(event.attributes.place || '');
      setDescription(event.attributes.description || '');
      setTime(finalTime || 43200);
    }
  }, [event]);

  return (
    <Form onSubmit={onSubmit} className="mx-auto">
      {/* Title */}
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      {/* Attendees */}
      <Form.Group className="mb-3" controlId="attendees">
        <Form.Label>Attendees</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
        />
      </Form.Group>

      {/* Place */}
      <Form.Group className="mb-3" controlId="place">
        <Form.Label>Place</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </Form.Group>

      {/* Time */}
      <Form.Group className="mb-3" controlId="time">
        <Form.Label>Time</Form.Label>
        <TimePicker
          size="lg"
          step={30}
          format={24}
          onChange={(value) => setTime(value)}
          value={time}
        />

      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          size="lg"
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="primary" type="submit">
          {is.emptyObject(event) ? 'Create' : 'Update'}
        </Button>

        {is.emptyObject(event) ? null : (
          <Button variant="outline-danger" onClick={onDelete}>Delete</Button>
        )}
      </div>
    </Form>
  );
}

EventForm.defaultProps = {
  event: {}
};

EventForm.propTypes = {
  event: PropTypes.object,
  selectedDate: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default EventForm;
