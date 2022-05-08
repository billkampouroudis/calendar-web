import React from 'react';
import { Spinner } from 'react-bootstrap';

function GlobalLoader() {
  return (
    <div className="global-loader">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}

export default GlobalLoader;
