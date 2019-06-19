import { observable, action } from 'mobx';

class DetailsStore {
  @observable currentItemId;

  @observable selectedOrderItemId;

  @action setCurrentItemId(itemId) {
    this.currentItemId = itemId;
  }

  @action setSelectedOrderItemId(orderItemId) {
    this.selectedOrderItemId = orderItemId;
  }
}

const detailsStore = new DetailsStore();

if (process.env.NODE_ENV === 'development') {
  window.detailsStore = detailsStore;
}

export default detailsStore;
