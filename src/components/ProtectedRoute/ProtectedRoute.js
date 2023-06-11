import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, isLoggedIn, ...props }) {
  return (
    
    <>
      {!isLoggedIn ? <Component {...props} isLoggedIn={isLoggedIn} /> : <Navigate to="/" />}
    </>
  );
}
export default ProtectedRoute;