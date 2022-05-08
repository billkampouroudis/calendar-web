import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MainLayout(props) {
  const { children, fluid } = props;

  return (
    <Container fluid={fluid} className="pt-3">
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
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
