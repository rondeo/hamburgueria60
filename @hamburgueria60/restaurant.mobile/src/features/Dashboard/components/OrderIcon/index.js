import AccessTime from '@material-ui/icons/AccessTime';
import Done from '@material-ui/icons/Done';
import Help from '@material-ui/icons/Help';
import { observer } from 'mobx-react';
import React from 'react';

import { SENT, DRAFT } from 'infrastructure/repositories/orders/constants';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';

export default observer(function OrderIcon({ orderId }) {
  const order = ordersStore.orders.get(orderId);
  if (!order) return null;
  switch (order.status) {
    case DRAFT:
      return <AccessTime />;
    case SENT:
      return <Done />;
    default:
      return <Help />;
  }
});
