import api from './itemsApi';
import itemsStore from './itemsStore';

class ItemsController {
  constructor() {
    this.store = itemsStore;
  }

  async fetchItems(pagination) {
    const start = (pagination.pageNumber - 1) * pagination.pageSize;
    const end = pagination.pageNumber * pagination.pageSize;
    const localItems = this.store.items.slice(start, end);

    // items not found locally
    if (localItems.length < pagination.pageSize) {
      // try to find them elsewhere
      const params = { pagination: { pageNumber: pagination.pageNumber } };

      try {
        const responseData = (await api.findItems(params)).data;
        this.store.items.append(responseData.data);
        return { items: responseData.data, metadata: responseData.metadata };
      } catch (e) {
        throw e;
      }
    }

    return { items: localItems, metadata: { pagination } };
  }
}

export default new ItemsController();
