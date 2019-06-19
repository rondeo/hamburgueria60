import pickItemStore from '../store';

import itemsController from 'infrastructure/repositories/items/itemsController';

class PickItemController {
  constructor() {
    this.store = pickItemStore;
  }

  async fetchNextPage() {
    if (this.store.pagination.hasNext()) {
      this.store.fetchItemsRequest.reset();
      this.store.fetchItemsRequest.setIdle(false);

      try {
        const { items, metadata } = await itemsController.fetchItems(
          this.store.pagination.next()
        );
        this.store.setPagination(metadata.pagination);

        this.store.setItems([
          ...this.store.items,
          // item could be string or object
          // check fetchItems return
          ...items.map(item => (item && item.id) || item)
        ]);
      } catch (e) {
        // TODO: better error handling
        this.store.fetchItemsRequest.setError(true);
        throw e;
      }

      this.store.fetchItemsRequest.setIdle(true);
    }
  }
}

const pickItemController = new PickItemController();
export default pickItemController;
