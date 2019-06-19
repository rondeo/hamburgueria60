import { action, observable } from 'mobx';

import ArrayMap from '../../collections/ArrayMap';
import itemsStore from '../items/itemsStore';
import quantityIncrementBehavior from '../quantityIncrementBehavior';

import OrderItem from './OrderItem';

export default class Order {
  id;

  @observable date = new Date();

  @observable status = 'DRAFT';

  @observable table;

  @observable total = 0;

  @observable changed = false;

  @observable persisted = false;

  items = new ArrayMap().setCollisionBehavior(quantityIncrementBehavior);

  orderItems = new ArrayMap();

  @action setDate(date) {
    this.date = date;
  }

  @action setTable(table) {
    this.table = table;
  }

  @action setStatus(status) {
    this.status = status;
  }

  @action markChanged() {
    this.changed = true;
  }

  @action unmarkChanged() {
    this.changed = false;
  }

  getTotal() {
    return (
      this.total ||
      this.orderItems.reduce((total, orderItem) => {
        const item = itemsStore.items.get(orderItem.itemId);
        if (!item) return total;
        return total + item.price * orderItem.quantity;
      }, 0)
    );
  }

  @action static fromApi(data) {
    const order = new Order();
    order.persisted = true;
    order.id = data.id;
    order.date = new Date(data.createdAt);
    order.status = data.status;
    order.table = data.restaurant.table;
    order.total = data.subtotal + data.additionValue - data.discountValue;

    // not expecting to have too many order items here tho
    data.items.forEach(orderItem => {
      // defining orderItems
      const envelope = new OrderItem(order.id, orderItem);
      order.orderItems.set(envelope.id, envelope);

      // definiting items
      order.items.set(orderItem.itemId, {
        id: orderItem.itemId,
        quantity: orderItem.quantity
      });
    });

    return order;
  }
}
