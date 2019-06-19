export default function map(collection, cb) {
  const array = [];
  collection.forEach(element => {
    array.push(cb(element));
  });
  return array;
}
