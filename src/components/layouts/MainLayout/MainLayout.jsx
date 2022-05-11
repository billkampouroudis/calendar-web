import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Navbar from '../../misc/Navbar/Navbar';

function MainLayout(props) {
  const { children, fluid } = props;

  return (
    <>
      <Navbar />

      <Container fluid={fluid} className="pt-3">
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </>

  );
}

MainLayout.defaultProps = {
  fluid: false
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool
};

export default MainLayout;
