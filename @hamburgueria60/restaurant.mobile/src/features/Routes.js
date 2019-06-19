import React from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { AUTH, DASHBOARD, ADD_ORDER } from './constants';
import Auth from './Auth';
import Dashboard from './Dashboard';
import AddOrder from './AddOrder';

const ErrorDialog = React.lazy(() => import('features/ErrorDialog'));

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={AUTH} component={Auth} />
          <Route path={DASHBOARD} component={Dashboard} />
          <Route path={ADD_ORDER} component={AddOrder} />

          <Redirect to={AUTH} />
        </Switch>
      </Router>

      <React.Suspense fallback={<div />}>
        <ErrorDialog />
      </React.Suspense>
    </>
  );
}
