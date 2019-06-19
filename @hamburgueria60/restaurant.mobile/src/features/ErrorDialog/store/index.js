import { observable, action } from 'mobx';

class ErrorDialogStore {
  @observable visible = false;

  @observable title = '';

  @observable message = '';

  closeCallback;

  onClose(callback) {
    this.closeCallback = callback;
  }

  @action show({ title, message }) {
    this.visible = true;
    this.message = message;
    this.title = title;

    return this;
  }

  @action hide() {
    this.visible = false;
    this.message = '';
    this.closeCallback = null;

    return this;
  }
}

export default new ErrorDialogStore();
