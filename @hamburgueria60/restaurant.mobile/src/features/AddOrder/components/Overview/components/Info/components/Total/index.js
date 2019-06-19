import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react';
import React from 'react';

import Currency from 'infrastructure/i18n/components/Currency';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';

const TotalPrice = observer(function TotalPrice({ orderId }) {
  const order = ordersStore.orders.get(orderId);
  if (!order) return null;
  return <Currency value={order.getTotal()} />;
});

export default function Total({ orderId }) {
  return (
    <ListItem>
      <ListItemText
        primaryTypographyProps={{ component: 'div' }}
        primary="Total"
        secondary={<TotalPrice orderId={orderId} />}
      />
    </ListItem>
  );
}
