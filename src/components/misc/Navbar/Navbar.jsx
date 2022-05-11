import React from 'react';
import {
  Navbar, Container, NavDropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { is } from '@bill.kampouroudis/js-utils';
import { useLocation } from 'react-router-dom';
import urls from '../../../pages/router/Urls';
import { getUser } from '../../../utils/user';

function MyNavbar() {
  const location = useLocation();

  const user = getUser();

  if (is.falsy(user)) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <LinkContainer to={`${urls.HOME}${location.search}`}>
          <Navbar.Brand>Welcome Calendar</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={user.username}>
            <LinkContainer to={urls.LOGOUT}>
              <NavDropdown.Item eventkey={1}>
                Logout
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
