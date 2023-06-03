import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return (
    <>
      {loggedIn ? <Component {...props} loggedIn={loggedIn} /> : <Navigate to="/" />}
    </>
  );
}
export default ProtectedRoute;