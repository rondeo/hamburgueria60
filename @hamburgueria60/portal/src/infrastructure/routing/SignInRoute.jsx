import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../features/login/services/authenticate';

const propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

export default function SignInRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

SignInRoute.propTypes = propTypes;
