import { observable, action } from 'mobx';

import ArrayMap from 'infrastructure/collections/ArrayMap';

class OrderStore {
  @observable orders = new ArrayMap();

  @action setOrders(orders) {
    this.orders = orders;
  }
}

const ordersStore = new OrderStore();

if (process.env.NODE_ENV === 'development') {
  window.ordersStore = ordersStore;
}

export default ordersStore;
