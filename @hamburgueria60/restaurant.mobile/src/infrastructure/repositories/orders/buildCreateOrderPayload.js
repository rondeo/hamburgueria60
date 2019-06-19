import { toJS } from 'mobx';

import authStore from 'features/Auth/store';

export const WAITER_TYPE = 'RESTAURANT';

export default function buildCreateOrderPayload(order) {
  const items = order.orderItems.map(orderItem => ({
    itemId: orderItem.itemId,
    label: toJS(orderItem.label),
    quantity: orderItem.quantity
  }));
  return {
    owner: { id: authStore.user.id },
    type: WAITER_TYPE,
    status: order.status,
    restaurant: { table: order.table },
    subtotal: order.getTotal(),
    items
  };
}
