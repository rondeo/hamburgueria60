import { observable, action } from 'mobx';

import map from './map';
import reduce from './reduce';

export default class ArrayMap {
  @observable array = [];

  @observable dict = {};

  insertInOrder = null;

  /**
   * Constructor
   * @param {Function} makeDefaultValue Function to return a new default value for each entry
   */
  constructor(makeDefaultValue) {
    this.makeDefaultValue = makeDefaultValue;
  }

  setCollisionBehavior(behavior) {
    this.collisionBehavior = behavior;
    return this;
  }

  setInsertionStrategy(insertInOrder) {
    this.insertInOrder = insertInOrder;
    return this;
  }

  get length() {
    return this.array.length;
  }

  get(key) {
    const element = this.dict[key];
    if (!element && this.makeDefaultValue) {
      const defaultValue = this.makeDefaultValue();
      this.set(key, defaultValue);
      return defaultValue;
    }
    return element;
  }

  getIn(keys) {
    const finalKey = keys.reduce((mergedKey, key, index) => {
      let partialKey = mergedKey;
      if (!key) {
        throw new Error('All keys must have a valid value');
      } else if (index > 0) {
        partialKey += '.';
      }
      partialKey += key;
      return partialKey;
    }, '');
    return this.get(finalKey);
  }

  @action
  set(key, value) {
    if (this.collisionBehavior && this.dict[key]) {
      this.dict[key] = this.collisionBehavior(this.dict[key], value);
    } else {
      this.dict[key] = value;
      this.array.unshift(key);
    }
  }

  @action
  delete(key) {
    this.array.splice(this.array.indexOf(key), 1);
    delete this.dict[key];
  }

  forEach(cb) {
    this.array.forEach(key => {
      cb(this.dict[key], key);
    });
  }

  map(cb) {
    return map(this, cb);
  }

  reduce(cb, initial = 0) {
    return reduce(this, cb, initial);
  }

  slice(...args) {
    // TODO: only slicing array, dict remains the same
    return this.array.slice(...args);
  }

  filter(cb) {
    return this.array.filter(id => cb(this.dict[id]));
  }

  @action append(array, parser) {
    array.forEach((item, index) => {
      const parsed = parser ? parser(item) : item;
      const previous = array[index - 1];

      if (this.insertInOrder) {
        this.insertInOrder(previous, parsed, index, this.array, this.dict);
      } else {
        this.dict[parsed.id] = parsed;
        this.array.push(parsed.id);
      }
    });
  }
}
