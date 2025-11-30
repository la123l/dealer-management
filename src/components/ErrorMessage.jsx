import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>Something went wrong while loading dealers.</p>
    <pre>{message}</pre>
  </div>
);

export default ErrorMessage;
