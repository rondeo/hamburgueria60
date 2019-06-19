export default function find(collection, cb) {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of collection) {
    const elegible = cb(element);
    if (elegible) return element;
  }
  return null;
}
