import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm/LoginForm';
import urls from './router/Urls';
import { isUserAuthenticated, storeUser } from '../utils/user';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    isUserAuthenticated()
      .then((user) => {
        // After the confirmation of the jwt, update the user value in case is not correct
        storeUser(user);

        navigate(urls.HOME);
      })
      .catch(() => { });
  }, []);

  return (
    <Container className="py-5">
      <LoginForm onSuccess={() => { navigate(urls.HOME); }} />
    </Container>
  );
}

export default LoginPage;
