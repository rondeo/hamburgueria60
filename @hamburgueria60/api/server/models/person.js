const error = require("../services/common/error");

function notFound() {
  return error({ statusCode: 404, code: "USERNAME_NOT_FOUND" });
}

function operationNotAllowed() {
  return error({ statusCode: 400, code: "OPERATION_NOT_ALLOWED" });
}

module.exports = function Controller(Person) {
  Person.once("dataSourceAttached", function onAttached() {
    Person.verifyToken = async function verifyToken(req, uid) {
      // eslint-disable-next-line eqeqeq
      if (req.accessToken.userId != uid) {
        throw error({ statusCode: 400, code: "INVALID_TOKEN" });
      }
    };
    Person.remoteMethod("verifyToken", {
      accepts: [
        { arg: "req", type: "object", http: { source: "req" } },
        { arg: "uid", type: "string", required: true }
      ],
      description: "Check if token is already valid and can be used.",
      returns: { type: "null", root: true },
      http: { path: "/:uid/verifyToken", verb: "get" }
    });

    Person.info = async function info(username) {
      const person = await Person.findOne({ where: { username } });
      if (!person) {
        throw notFound();
      }
      return { hasCredentials: !!person.password, id: person.id };
    };
    Person.remoteMethod("info", {
      accepts: [{ arg: "username", type: "string", required: true }],
      description: "Get public info for unregistered user",
      returns: { type: "null", root: true },
      http: { path: "/:username/info", verb: "get" }
    });

    Person.beforeRemote("login", async function Login(context) {
      const ONE_DAY_IN_SECS = 86400;
      context.args.credentials.ttl = ONE_DAY_IN_SECS;
    });

    Person.afterRemote("login", async function Login(context) {
      const token = context.result;
      const person = await Person.findById(token.userId);
      context.result.name = person.name;
    });

    Person.beforeRemote("prototype.patchAttributes", async context => {
      // TODO: only admin could do that
      const person = context.instance;
      if (person.password) {
        throw operationNotAllowed();
      }
    });
  });
};
