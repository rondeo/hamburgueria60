import List from '@material-ui/core/List';
import React from 'react';

import Orders from '../Orders';
import Loading from '../Loading';
import OrdersSentinel from '../OrdersSentinel';

export default function OrderList() {
  return (
    <List>
      <Orders />
      <OrdersSentinel />
      <Loading />
    </List>
  );
}
