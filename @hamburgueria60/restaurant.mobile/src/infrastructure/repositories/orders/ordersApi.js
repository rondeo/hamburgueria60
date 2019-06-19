import axios from 'axios';

import { Api } from 'infrastructure/api';

class OrdersApi extends Api {
  findOrders(params) {
    return axios.get(`${this.url}/orders`, { params });
  }

  createOrder(order) {
    return axios.post(`${this.url}/orders`, order);
  }

  updateOrder(order) {
    return axios.patch(`${this.url}/orders/${order.id}`, order);
  }
}

export default new OrdersApi();
