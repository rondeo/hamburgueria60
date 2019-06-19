export default function reduce(collection, cb, initial) {
  let modifiable = initial;
  collection.forEach(element => {
    modifiable = cb(modifiable, element);
  });
  return modifiable;
}
