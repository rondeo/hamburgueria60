const { getParams } = require("../services/pagination");

function parse(pagination) {
  if (typeof pagination === "string") return JSON.parse(pagination);
  return pagination;
}

module.exports = function Controller(DefaultModel) {
  DefaultModel.setup = function Setup(...args) {
    DefaultModel.base.setup.apply(this, args);

    this.beforeRemote("find", async context => {
      context.args.filter = context.args.filter || {};
      context.req.query.pagination = parse(context.req.query.pagination) || {};

      // order by name
      if (!context.args.filter.order) {
        context.args.filter.order = "name ASC";
      }

      const total = await this.count(context.args.filter.where);

      const pagination = getParams({ ...context.req.query.pagination, total });
      context.args.pagination = pagination;
      context.args.filter = { ...context.args.filter, ...pagination.filter };
    });
    this.afterRemote("find", async (context, remoteMethodOutput) => {
      context.result = {
        metadata: {
          pagination: context.args.pagination
        },
        data: remoteMethodOutput
      };
    });
  };

  DefaultModel.setup();
};
