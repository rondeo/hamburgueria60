import { observable, action } from 'mobx';

import ArrayMap from 'infrastructure/collections/ArrayMap';

class ItemsStore {
  @observable items = new ArrayMap() /* .setInsertionStrategy(this.sort) */;

  @action setItems(items) {
    this.items = items;
  }

  @action sort = (previous, current, index, array, dict) => {
    // eslint-disable-next-line no-param-reassign
    dict[current.id] = current;

    if (previous) {
      const offset = previous.name.localeCompare(current.name);
      array.splice(index - offset, 0, current.id);
    } else {
      array.push(current.id);
    }
  };
}

const itemsStore = new ItemsStore();

if (process.env.NODE_ENV === 'development') {
  window.itemsStore = itemsStore;
}

export default itemsStore;
