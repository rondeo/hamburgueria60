export default function quantityIncrementBehavior(oldItem, newItem) {
  return {
    ...newItem,
    quantity: newItem.quantity + oldItem.quantity
  };
}
