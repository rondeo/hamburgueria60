const MISSING_TABLE_FOR_RESTAURANT_TYPE = () => ({
  name: "MISSING_TABLE_FOR_RESTAURANT_TYPE",
  message: "You must provide restaurant.table for RESTAURANT type",
  statusCode: 400
});
const MISSING_DELIVERY = () => ({
  name: "MISSING_TABLE_FOR_RESTAURANT_TYPE",
  message: "You must provide delivery.* for DELIVERY type",
  statusCode: 400
});
const NO_DELIVERY_FOR_RESTAURANT = () => ({
  name: "NO_DELIVERY_FOR_RESTAURANT",
  message: "You must not provide `delivery` property for RESTAURANT type",
  statusCode: 400
});
const NO_RESTAURANT_FOR_DELIVERY = () => ({
  name: "NO_RESTAURANT_FOR_DELIVERY",
  message: "You must not provide `restaurant` property for DELIVERY type",
  statusCode: 400
});
const AT_LEAST_ONE_ITEM = () => ({
  name: "AT_LEAST_ONE_ITEM",
  message: "You must provide at least one item for this order",
  statusCode: 400
});
module.exports = {
  MISSING_TABLE_FOR_RESTAURANT_TYPE,
  NO_DELIVERY_FOR_RESTAURANT,
  NO_RESTAURANT_FOR_DELIVERY,
  MISSING_DELIVERY,
  AT_LEAST_ONE_ITEM
};
