import get from 'lodash/get';

import getInterval from './getInterval';
import Order from './Order';
import api from './ordersApi';
import ordersStore from './ordersStore';

import authStore from 'features/Auth/store';

class OrdersController {
  constructor(store) {
    this.store = store;
  }

  async fetchOrders(pagination) {
    const start = (pagination.pageNumber - 1) * pagination.pageSize;
    const end = pagination.pageNumber * pagination.pageSize;
    const localOrders = this.store.orders.slice(start, end);

    // orders not found locally
    if (!localOrders.length < pagination.pageSize) {
      const { startsAt, endsAt } = getInterval();
      const params = {
        pagination: { pageNumber: pagination.pageNumber },
        filter: {
          order: 'createdAt DESC',
          where: {
            and: [
              {
                'owner.id': get(authStore, 'user.id'),
                createdAt: { gte: startsAt, lte: endsAt }
              }
            ]
          }
        }
      };

      try {
        // try to find them elsewhere
        const responseData = (await api.findOrders(params)).data;
        ordersStore.orders.append(responseData.data, data =>
          Order.fromApi(data)
        );
        return { orders: responseData.data, metadata: responseData.metadata };
      } catch (e) {
        throw e;
      }
    }

    return { orders: localOrders, metadata: { pagination } };
  }

  canDiscard(orderId) {
    const order = this.store.orders.get(orderId);
    return order.status === 'DRAFT' && !order.items.length;
  }

  isEmpty(orderId) {
    const order = this.store.orders.get(orderId);
    return order.status === 'DRAFT' && (!order.items.length || !order.table);
  }

  canSend(orderId) {
    return !this.isEmpty(orderId);
  }
}

export default new OrdersController(ordersStore);
