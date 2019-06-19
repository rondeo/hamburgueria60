import { observable, action } from 'mobx';

class SendDialogStore {
  @observable visible = false;

  @action show() {
    this.visible = true;
  }

  @action hide() {
    this.visible = false;
  }
}

const sendDialogStore = new SendDialogStore();
export default sendDialogStore;
