import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from './auth';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const { authTokens } = useAuth();
  console.log('authTokens:', authTokens);

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
