import { observable, action } from 'mobx';

import { NEW } from '../constants';

class DescriptionDialogStore {
  timeout;

  @observable mode = NEW;

  @observable isVisible = false;

  @observable orderItemId = null;

  @observable description = '';

  @action setDescription(description) {
    this.description = description;
  }

  @action setOrderItemId(orderItemId) {
    this.orderItemId = orderItemId;
  }

  @action setMode(mode) {
    this.mode = mode;
  }

  @action
  show() {
    this.isVisible = true;
  }

  @action
  hide() {
    this.isVisible = false;
    this.orderItemId = null;
    this.description = '';
    this.mode = NEW;
  }
}

const descriptionDialogStore = new DescriptionDialogStore();
export default descriptionDialogStore;
