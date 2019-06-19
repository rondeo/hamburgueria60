import { observable, action } from 'mobx';

import { ITEMS } from '../constants';

import { DialogStore } from 'infrastructure/repositories/common/DialogStore';
import Request from 'infrastructure/repositories/common/Request';

class OverviewStore {
  @observable currentOrderId;

  @observable tab = ITEMS;

  sendDialog = new DialogStore();

  fetchItemsRequest = new Request();

  sendRequest = new Request();

  @action setCurrentOrderId(orderId) {
    this.currentOrderId = orderId;
  }

  @action setTab(tab) {
    this.tab = tab;
  }
}

const overviewStore = new OverviewStore();

if (process.env.NODE_ENV === 'development') {
  window.overviewStore = overviewStore;
}

export default overviewStore;
