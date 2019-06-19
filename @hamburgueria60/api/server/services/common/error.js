module.exports = function error(data) {
  const err = new Error();
  err.name = data.name;
  err.statusCode = data.statusCode;
  err.message = data.message;
  err.code = data.code;

  delete err.stack;

  return err;
};
