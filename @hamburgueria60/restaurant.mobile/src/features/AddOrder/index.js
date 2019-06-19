import React from 'react';
import { Route } from 'react-router-dom';

import Details from './components/Details';
import ChooseTable from './components/ChooseTable';
import Overview from './components/Overview';
import PickItem from './components/PickItem';
import {
  OVERVIEW,
  CHOOSE_TABLE,
  PICK_ITEM,
  ADD_ITEMS_DETAILS
} from './constants';

export default function AddOrder() {
  return (
    <React.Fragment>
      <Route path={OVERVIEW} component={Overview} exact />
      <Route path={CHOOSE_TABLE} component={ChooseTable} exact />
      <Route path={PICK_ITEM} component={PickItem} exact />
      <Route path={ADD_ITEMS_DETAILS} component={Details} exact />
    </React.Fragment>
  );
}
