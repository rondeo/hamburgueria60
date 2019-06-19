export default function reverseMap(collection, cb) {
  const array = [];
  const reverse = [...collection].reverse();
  let index = reverse.length;
  // eslint-disable-next-line no-restricted-syntax
  for (const element of reverse) {
    // eslint-disable-next-line no-plusplus
    array.push(cb(element, --index));
  }
  return array;
}
