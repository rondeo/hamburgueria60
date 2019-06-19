export default function replace(arr, key, newval) {
  const indexOf = arr.indexOf(key);
  if (indexOf !== -1) {
    // eslint-disable-next-line no-param-reassign
    arr[indexOf] = newval;
  }
}
