import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { toast } from 'react-toastify';
import { Pagination } from 'react-bootstrap';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import { getUser } from '../../../utils/user';
import eventApi from '../../../api/eventApi';

function EventCards(props) {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { date } = props;
  const user = getUser();

  const renderPagination = () => {
    const items = [];

    if (pagination.pageCount === 1) {
      return null;
    }

    for (let number = 1; number <= pagination.pageCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pagination.page}
          onClick={() => (
            navigate(`${location.pathname}?page=${number}`)
          )}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination>
        {items}
      </Pagination>
    );
  };

  useEffect(() => {
    const page = searchParams.get('page');

    const query = qs.stringify({
      filters: {
        // users_permissions_user: {
        //   id: {
        //     $eq: user.id
        //   }
        // },
        creatorId: {
          $eq: user.id
        },
        dateTime: {
          $gte: new Date(`${date.date()} ${date.format('MMMM')} ${date.year()} 00:00`).toISOString(),
          $lte: new Date(`${date.date()} ${date.format('MMMM')} ${date.year()} 23:59`).toISOString()
        }
      },
      pagination: {
        page: Number(page) || 1,
        pageSize: 10
      }
    });

    // Fetch all the events of this month
    eventApi.find({ query })
      .then((res) => {
        setEvents(res.data.data);
        setPagination(res.data.meta.pagination);
      })
      .catch(() => toast.error('There was an error while trying to fetch the your events.'));
  }, [searchParams.get('page')]);

  return (
    <>
      {
        events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))
      }
      {renderPagination()}

    </>

  );
}
EventCards.propTypes = {
  date: PropTypes.object.isRequired
};

export default EventCards;
