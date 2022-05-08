import React from 'react';
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import Calendar from '../components/misc/Calendar/Calendar';

const HomePage = function homePage() {
  return (
    <MainLayout fluid>
      <Calendar />
    </MainLayout>
  );
};

export default HomePage;
