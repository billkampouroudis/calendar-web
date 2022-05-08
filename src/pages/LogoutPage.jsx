import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { removeToken } from '../utils/jwt';
import { removeUser } from '../utils/user';
import urls from './router/Urls';

const LogoutPage = function logoutPage() {
  const location = useLocation();

  useEffect(() => {
    removeToken();
    removeUser();
  }, []);

  return (
    <Navigate
      to={{
        pathname: urls.LOGIN,
        state: { from: location }
      }}
    />
  );
};

export default LogoutPage;
