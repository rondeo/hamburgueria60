import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Route } from 'react-router-dom';

import { AUTH_USER, AUTH_PASSWORD, AUTH_REGISTER_PASSWORD } from './constants';
import Password from './components/Password';
import RegisterPassword from './components/RegisterPassword';
import User from './components/User';
import { container, content } from './index.module.scss';

import { purple } from 'infrastructure/theme/mui-theme';

export default function Auth() {
  return (
    <>
      <ThemeProvider theme={purple}>
        <div className={container}>
          <div className={content}>
            <Route path={AUTH_USER} exact component={User} />
            <Route path={AUTH_PASSWORD} exact component={Password} />
            <Route
              path={AUTH_REGISTER_PASSWORD}
              exact
              component={RegisterPassword}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
