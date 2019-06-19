import { observable, action } from 'mobx';

import Pagination from 'infrastructure/repositories/common/Pagination';
import Request from 'infrastructure/repositories/common/Request';

class PickItemStore {
  @observable items = [];

  @observable pagination = new Pagination();

  fetchItemsRequest = new Request();

  @action setItems(items) {
    this.items = items;
  }

  @action setPagination(pagination) {
    this.pagination = new Pagination(pagination);
  }
}

const pickItemStore = new PickItemStore();
export default pickItemStore;
