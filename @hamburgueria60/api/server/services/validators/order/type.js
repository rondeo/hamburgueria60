const {
  MISSING_TABLE_FOR_RESTAURANT_TYPE,
  NO_DELIVERY_FOR_RESTAURANT,
  NO_RESTAURANT_FOR_DELIVERY,
  MISSING_DELIVERY,
  AT_LEAST_ONE_ITEM
} = require("./errors");

module.exports = function orderTypeValidator(model) {
  model.beforeRemote("create", (context, instance, next) => {
    const { data } = context.args;
    if (data.type === "RESTAURANT") {
      if (
        (!data.restaurant || !data.restaurant.table) &&
        data.status !== "DRAFT"
      ) {
        next(MISSING_TABLE_FOR_RESTAURANT_TYPE(context));
      } else if (data.delivery) {
        next(NO_DELIVERY_FOR_RESTAURANT(context));
      }
    } else if (data.type === "DELIVERY") {
      // TODO: needs to validate also the child attrs
      if (!data.delivery) {
        next(MISSING_DELIVERY(context));
      } else if (data.restaurant) {
        next(NO_RESTAURANT_FOR_DELIVERY(context));
      }
    }

    // TODO: validate item sent
    if (!data.items.length && data.status !== "DRAFT") {
      next(AT_LEAST_ONE_ITEM(context));
    }

    next();
  });
};
