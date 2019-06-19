module.exports = function parse(object) {
  return JSON.stringify(object, null, 2);
};
