import { Observer } from 'mobx-react';
import React from 'react';

import Currency from 'infrastructure/i18n/components/Currency';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';

export default function OrderTotal({ orderId }) {
  const order = ordersStore.orders.get(orderId);
  if (!order) return null;
  return <Observer>{() => <Currency value={order.getTotal()} />}</Observer>;
}
