import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import urls from './Urls';
import { isUserAuthenticated, storeUser } from '../../utils/user';
import GlobalLoader from '../../components/misc/GlobalLoader/GlobalLoader';

function PrivateRoute(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const { children } = props;

  useEffect(() => {
    isUserAuthenticated()
      .then((res) => {
        // After the confirmation of the jwt, update the user value in case is not correct
        storeUser(res.data);

        setIsAuthenticated(true);
      })
      .catch(() => {
        navigate(urls.LOGOUT);
      });
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return <GlobalLoader />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;
