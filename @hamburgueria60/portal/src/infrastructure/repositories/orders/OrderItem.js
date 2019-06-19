import { observable, action, runInAction } from 'mobx';
import shortid from 'shortid';

export default class OrderItem {
  id;

  itemId;

  @observable quantity;

  @observable label = { primary: '' };

  constructor(orderId, data) {
    this.id = `${orderId}-${shortid()}`;

    if (data) {
      runInAction('OrderItem#constructor', () => {
        this.itemId = data.itemId;
        this.quantity = data.quantity;
        this.label = data.label;
      });
    }
  }

  @action incrementQuantityBy(unit) {
    this.quantity += unit;
  }

  @action decrementQuantityBy(unit) {
    this.quantity -= unit;
  }

  @action setDescription(description) {
    this.label.primary = description;
  }

  isDefault() {
    return this.label && this.label.primary === 'Padrão';
  }
}
