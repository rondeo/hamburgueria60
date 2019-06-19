import { observer } from 'mobx-react';
import React from 'react';

import Order from '../Order';

import dashboardStore from 'features/Dashboard/store';

export default observer(function Orders() {
  return dashboardStore.orders.map(orderId => (
    <Order key={orderId} orderId={orderId} />
  ));
});
