import { action } from 'mobx';

import { ITEMS } from '../constants';
import overviewStore from '../store';

import getReadableErrorMessage from 'infrastructure/commons/getReadableErrorMessage';
import itemsApi from 'infrastructure/repositories/items/itemsApi';
import itemsStore from 'infrastructure/repositories/items/itemsStore';
import buildCreateOrderPayload from 'infrastructure/repositories/orders/buildCreateOrderPayload';
import buildUpdateOrderPayload from 'infrastructure/repositories/orders/buildUpdateOrderPayload';
import Order from 'infrastructure/repositories/orders/Order';
import ordersApi from 'infrastructure/repositories/orders/ordersApi';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';
import dashboardController from 'features/Dashboard/controller';

class OverviewController {
  constructor() {
    this.store = overviewStore;
  }

  getCurrentOrder() {
    return ordersStore.orders.get(this.store.currentOrderId);
  }

  @action resetTab() {
    this.store.tab = ITEMS;
  }

  @action dropOrder() {
    ordersStore.orders.delete(this.store.currentOrderId);
  }

  async fetchItems() {
    this.store.fetchItemsRequest.setIdle(false);
    const order = ordersStore.orders.get(this.store.currentOrderId);
    const ids = [];

    order.items.forEach(item => {
      if (!itemsStore.items.get(item.id)) {
        ids.push(item.id);
      }
    });

    if (ids.length) {
      const { data: items } = (await itemsApi.findItemsById(ids)).data;
      itemsStore.items.append(items);
    }

    this.store.fetchItemsRequest.setIdle(true);
  }

  @action async send() {
    this.store.sendRequest.reset();
    this.store.sendRequest.setIdle(false);

    const currentOrder = this.getCurrentOrder();
    const payload = buildCreateOrderPayload(currentOrder);

    try {
      const { data: rawNewOrder } = await ordersApi.createOrder(payload);
      const newOrder = Order.fromApi(rawNewOrder);

      // replace in dashboard
      dashboardController.replaceOrder(currentOrder, newOrder);
      // add to the store
      ordersStore.orders.set(newOrder.id, newOrder);
      // set it as current
      // because dialog is appearing on Overview screen
      overviewStore.setCurrentOrderId(newOrder.id);
      // remove old
      ordersStore.orders.delete(currentOrder.id);
    } catch (e) {
      const message = getReadableErrorMessage(e);
      this.store.sendRequest.setError(true);
      this.store.sendRequest.setMessage(message);
      return false;
    } finally {
      this.store.sendRequest.setIdle(true);
    }

    return true;
  }

  @action async update() {
    this.store.sendRequest.reset();
    this.store.sendRequest.setIdle(false);

    const currentOrder = this.getCurrentOrder();
    const payload = buildUpdateOrderPayload(currentOrder);

    try {
      await ordersApi.updateOrder(payload);
    } catch (e) {
      const message = getReadableErrorMessage(e);
      this.store.sendRequest.setError(true);
      this.store.sendRequest.setMessage(message);
      return false;
    } finally {
      this.store.sendRequest.setIdle(true);
    }
    return true;
  }
}

const overviewController = new OverviewController();
export default overviewController;
