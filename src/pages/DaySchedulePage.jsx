import React, { useEffect } from 'react';
import moment from 'moment';

import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import urls from './router/Urls';
import EventCards from '../components/misc/EventCard/EventCards';

function DaySchedulePage() {
  const navigate = useNavigate();

  const { date } = useParams();
  const momentDate = moment(date, 'DD/MM/YYYY');

  useEffect(() => {
    if (!momentDate.isValid()) {
      navigate(urls.HOME);
    }
  }, []);

  return (
    <MainLayout>
      <Breadcrumb>
        <LinkContainer to={urls.HOME}>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>
          Events for
          {' '}
          {date}
        </Breadcrumb.Item>
      </Breadcrumb>

      <EventCards date={momentDate} />

    </MainLayout>
  );
}

export default DaySchedulePage;
