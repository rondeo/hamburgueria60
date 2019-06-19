export default function forEach(array, cb) {
  array.forEach((current, currentIndex) => {
    const previousIndex = currentIndex - 1;
    const previous = array[previousIndex];
    return cb(current, currentIndex, previous, previousIndex, array);
  });
}
