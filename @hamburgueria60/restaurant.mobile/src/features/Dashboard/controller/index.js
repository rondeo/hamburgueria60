import { action } from 'mobx';
import shortid from 'shortid';

import dashboardStore from '../store';

import replace from 'infrastructure/collections/replace';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';
import Order from 'infrastructure/repositories/orders/Order';
import ordersController from 'infrastructure/repositories/orders/ordersController';
import overviewController from 'features/AddOrder/components/Overview/controller';
import overviewStore from 'features/AddOrder/components/Overview/store';

class DashboardController {
  constructor() {
    this.store = dashboardStore;
    this.ordersStore = ordersStore;
  }

  createOrder() {
    const order = new Order();
    order.id = `order-${shortid()}`;

    this.ordersStore.orders.set(order.id, order);
    overviewStore.setCurrentOrderId(order.id);
    this.store.prependOrder(order.id);
  }

  @action dropOrder() {
    const currentOrder = overviewController.getCurrentOrder();
    const index = this.store.orders.findIndex(
      orderId => orderId === currentOrder.id
    );

    if (index !== -1) {
      this.store.orders.splice(index, 1);
    } else {
      throw new Error("Oops, you shouldn't see this error happening");
    }
  }

  @action replaceOrder(oldOrder, newOrder) {
    replace(this.store.orders, oldOrder.id, newOrder.id);
  }

  async fetchNextPage() {
    if (this.store.pagination.hasNext()) {
      this.store.fetchOrdersRequest.reset();
      this.store.fetchOrdersRequest.setIdle(false);

      try {
        const { orders, metadata } = await ordersController.fetchOrders(
          this.store.pagination.next()
        );
        this.store.setPagination(metadata.pagination);
        this.store.setOrders([
          ...this.store.orders,
          ...orders.map(order => (order && order.id) || order)
        ]);
      } catch (e) {
        // TODO: better error handling
        this.store.fetchOrdersRequest.setError(true);
        throw e;
      } finally {
        this.store.fetchOrdersRequest.setIdle(true);
      }
    }
  }
}

const dashboardController = new DashboardController();
export default dashboardController;
