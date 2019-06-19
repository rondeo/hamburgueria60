import getCapitalLetter from './getCapitalLetter';

import forEach from 'infrastructure/collections/forEach';
import itemsStore from 'infrastructure/repositories/items/itemsStore';

export default class Grouping {
  items = [];

  blocks = [];

  onNewBlockCallback = null;

  onExistingBlockCallback = null;

  constructor({ items }) {
    this.items = items;
  }

  onNewBlock(cb) {
    this.onNewBlockCallback = cb;
    return this;
  }

  onExistingBlock(cb) {
    this.onExistingBlockCallback = cb;
    return this;
  }

  buildComponent() {
    if (!this.items.length) return null;

    let content = [];

    forEach(this.items, (currentId, currentIndex, previousId) => {
      const current = currentId && itemsStore.items.get(currentId);
      const previous = previousId && itemsStore.items.get(previousId);

      const currentLetter = getCapitalLetter(current.name);
      const previousLetter = previous ? getCapitalLetter(previous.name) : null;
      const isBlockUnique = currentLetter !== previousLetter;

      if (isBlockUnique) {
        content = [];
        const block = this.onNewBlockCallback({
          letter: currentLetter,
          content
        });
        this.blocks.push(block);
      }

      const component = this.onExistingBlockCallback({
        item: current,
        index: currentIndex
      });

      content.push(component);
    });

    return this.blocks;
  }
}
