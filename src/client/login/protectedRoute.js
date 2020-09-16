import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from './auth';

const ProtectedRoute = ({ component: Component, handlePath, isLoggedIn, ...rest }) => {
  const { authTokens } = useAuth();
  console.log('authTokens:', authTokens);

  const location = useLocation();
  console.log('this is in protected route', location);
  handlePath(location.pathname);
  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? <Component {...rest} {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
