import { observable, action } from 'mobx';

export class DialogStore {
  @observable visible;

  @action setVisible(visible) {
    this.visible = visible;
  }
}
