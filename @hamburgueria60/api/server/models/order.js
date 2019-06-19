const enumeration = require("../services/enum");
const orderTypeValidator = require("../services/validators/order/type");

module.exports = function Controller(Order) {
  enumeration()
    .setProperty("status")
    .setModel(Order)
    .setEnum([
      "DRAFT",
      "SENT",
      "IN_PROGRESS",
      "SERVED",
      "PAID",
      "ON_THE_WAY",
      "DELIVERED"
    ])
    .build();

  enumeration()
    .setProperty("type")
    .setModel(Order)
    .setEnum(["RESTAURANT", "DELIVERY"])
    .build();

  // response cleaning
  Order.afterRemote("create", async context => {
    if (context.args.data.type === "RESTAURANT") {
      context.result.unsetAttribute("delivery");
    } else if (context.args.data.type === "DELIVERY") {
      context.result.unsetAttribute("restaurant");
    }
  });

  // response cleaning
  Order.afterRemote("find", async context => {
    context.result.data.forEach(order => {
      if (order.type === "RESTAURANT") {
        order.unsetAttribute("delivery");
      } else if (order.type === "DELIVERY") {
        order.unsetAttribute("restaurant");
      }
    });
  });

  // args validation
  orderTypeValidator(Order);

  Order.observe("before save", async context => {
    const order = context.instance || context.data;

    // append owner data
    const { Person } = Order.app.models;
    const { id } = order.owner;
    const person = await Person.findById(id);

    order.owner.username = person.username;
    order.owner.name = person.name;
  });
};
