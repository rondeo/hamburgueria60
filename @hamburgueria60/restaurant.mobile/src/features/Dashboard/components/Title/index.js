import { observer } from 'mobx-react';
import React from 'react';
import { FormattedRelative } from 'react-intl';

import Table from '../Table';
import OrderDate from '../OrderDate';

import ordersStore from 'infrastructure/repositories/orders/ordersStore';
import Box from 'infrastructure/shared/Box';

export default observer(function Title({ orderId }) {
  const order = ordersStore.orders.get(orderId);
  if (!order) return null;
  return (
    <Box display="flex" alignItems="baseline">
      <Table>{order.table ? `Mesa ${order.table}` : 'Sem mesa'}</Table>
      <OrderDate>
        <FormattedRelative value={order.date} />
      </OrderDate>
    </Box>
  );
});
