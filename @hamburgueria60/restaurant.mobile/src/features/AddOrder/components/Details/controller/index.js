import { action, observable } from 'mobx';

import detailsStore from '../store';
import overviewController from '../../Overview/controller';

import itemsStore from 'infrastructure/repositories/items/itemsStore';
import OrderItem from 'infrastructure/repositories/orders/OrderItem';

class DetailsController {
  @observable selectedItemOrderItems;

  constructor() {
    this.store = detailsStore;
    this.reset();
  }

  @action reset() {
    this.selectedItemOrderItems = null;
  }

  getCurrentItem() {
    return itemsStore.items.get(this.store.currentItemId);
  }

  @action refreshCache() {
    this.reset();

    const { orderItems } = overviewController.getCurrentOrder();
    const itemId = this.store.currentItemId;
    if (!this.selectedItemOrderItems) {
      this.selectedItemOrderItems = [];
      orderItems.forEach(orderItem => {
        if ((itemId && orderItem.itemId === itemId) || !itemId) {
          this.selectedItemOrderItems.push(orderItem);
        }
      });
    }
  }

  getCachedOrderItems() {
    if (!this.selectedItemOrderItems) {
      this.refreshCache();
    }
    return this.selectedItemOrderItems;
  }

  getOrderItem() {
    const order = overviewController.getCurrentOrder();
    const orderItem = order.orderItems.get(this.store.selectedOrderItemId);
    return orderItem;
  }

  getItemFromOrder() {
    const order = overviewController.getCurrentOrder();
    return order.items.get(this.store.currentItemId);
  }

  @action addDefaultItem() {
    this.addCustomItem('Padrão');
  }

  @action addCustomItem(description) {
    let orderItem;
    // eslint-disable-next-line no-restricted-syntax
    for (const iOrderItem of this.selectedItemOrderItems) {
      if (iOrderItem.label.primary === description) {
        iOrderItem.incrementQuantityBy(1);
        orderItem = iOrderItem;
        break;
      }
    }

    const order = overviewController.getCurrentOrder();
    if (!orderItem) {
      orderItem = new OrderItem(order.id, {
        quantity: 1,
        label: { primary: description },
        itemId: detailsStore.currentItemId
      });

      this.selectedItemOrderItems.push(orderItem);

      order.orderItems.set(orderItem.id, orderItem);
    }

    order.items.set(orderItem.itemId, {
      id: orderItem.itemId,
      quantity: 1
    });

    // mark as changed
    order.markChanged();
  }

  @action changeOrderItem(description) {
    const orderItem = this.getOrderItem();
    orderItem.setDescription(description);

    // mark as changed
    overviewController.getCurrentOrder().markChanged();
  }

  @action decrementQuantity(unit) {
    const order = overviewController.getCurrentOrder();
    const orderItem = order.orderItems.get(this.store.selectedOrderItemId);

    // decrease order item quantity
    orderItem.decrementQuantityBy(unit);
    // decrease item quantity
    order.items.get(this.store.currentItemId).quantity -= unit;

    const noMoreOrderItems = this.getCachedOrderItems().length === 1;
    if (orderItem.quantity === 0) {
      this.store.setSelectedOrderItemId(null);

      // removing order item in case of zero
      order.orderItems.delete(orderItem.id);

      if (noMoreOrderItems) {
        // removing item in case of zero
        order.items.delete(orderItem.itemId);
      }

      this.refreshCache();
    }

    // mark as changed
    order.markChanged();
  }
}

const detailsController = new DetailsController();
export default detailsController;
