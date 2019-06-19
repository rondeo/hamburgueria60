const clean = require('remover-acentos');
const dasherize = require('dasherize');

module.exports = function tag(string) {
  return dasherize(clean(string));
};
