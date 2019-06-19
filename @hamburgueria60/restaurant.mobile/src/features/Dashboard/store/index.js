import { observable, action } from 'mobx';

import Pagination from 'infrastructure/repositories/common/Pagination';
import Request from 'infrastructure/repositories/common/Request';

class DashboardStore {
  @observable orders = [];

  @observable pagination = new Pagination();

  fetchOrdersRequest = new Request();

  @action setOrders(orders) {
    this.orders = orders;
  }

  @action prependOrder(order) {
    this.orders.unshift(order);
  }

  @action setPagination(pagination) {
    this.pagination = new Pagination(pagination);
  }
}

const dashboardStore = new DashboardStore();

if (process.env.NODE_ENV === 'development') {
  window.dashboardStore = dashboardStore;
}

export default dashboardStore;
