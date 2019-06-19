class Iterator {
  constructor({ start, end, step }) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  map(callback) {
    const array = [];
    for (let i = this.start; i < this.end; i += this.step) {
      array.push(callback(i));
    }
    return array;
  }

  forEach(callback) {
    for (let i = this.start; i < this.end; i += this.step) {
      callback(i);
    }
  }
}

export default function range(start = 0, end, step = 1) {
  return new Iterator({ start, end, step });
}
