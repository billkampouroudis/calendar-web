import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import authApi from '../../../api/authApi';
import { storeToken } from '../../../utils/jwt';
import { storeUser } from '../../../utils/user';

function LoginForm(props) {
  const [identifier, setIdentifier] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    authApi.login({ identifier, password })
      .then((res) => {
        storeToken(res.data.jwt);
        storeUser(res.data.user);

        props.onSuccess();
      })
      .catch(() => toast.error('Your email or password is incorrect'));
  };

  return (
    <Form onSubmit={onSubmit} style={{ maxWidth: '600px' }} className="mx-auto">
      <h1 className="mb-4">Login</h1>

      <Form.Group className="mb-3" controlId="identifier">
        <Form.Label>Email or Username</Form.Label>
        <Form.Control size="lg" type="text" placeholder="" onChange={(e) => setIdentifier(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control size="lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Login
        </Button>
      </div>

    </Form>

  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default LoginForm;
