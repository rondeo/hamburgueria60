import { observable, action } from 'mobx';

class NotSavedDialogStore {
  @observable visible = false;

  @action show() {
    this.visible = true;
  }

  @action hide() {
    this.visible = false;
  }
}

const notSavedDialogStore = new NotSavedDialogStore();
export default notSavedDialogStore;
