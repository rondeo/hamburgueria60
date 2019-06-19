import { observable, action } from 'mobx';

export default class Request {
  @observable idle = true;

  @observable error = false;

  @observable message = '';

  @action setIdle(flag) {
    this.idle = flag;
  }

  @action setError(flag) {
    this.error = flag;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action reset() {
    this.progress = false;
    this.idle = true;
    this.error = false;
    this.message = '';
  }
}
