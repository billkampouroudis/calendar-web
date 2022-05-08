import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import urls from './router/Urls';

// Pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={urls.LOGIN}
          element={(
            <LoginPage />
          )}
          exact
        />

        <Route
          path={urls.LOGOUT}
          element={(
            <LogoutPage />
          )}
          exact
        />

        <Route
          path={urls.HOME}
          element={(
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          )}
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
