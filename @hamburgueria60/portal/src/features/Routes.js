import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { HOME } from './constants';
import Home from './Home';

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={HOME} component={Home} />
          <Redirect to={HOME} />
        </Switch>
      </Router>
    </>
  );
}
