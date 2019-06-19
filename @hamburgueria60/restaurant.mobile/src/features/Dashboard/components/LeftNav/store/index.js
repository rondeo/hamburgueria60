import { observable, action } from 'mobx';

class LeftNavStore {
  @observable isOpen = false;

  @action open() {
    this.isOpen = true;
  }

  @action close() {
    this.isOpen = false;
  }
}

const leftNavStore = new LeftNavStore();

if (process.env.NODE_ENV === 'development') {
  window.leftNavStore = leftNavStore;
}

export default leftNavStore;
