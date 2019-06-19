class Enumeration {
  setProperty(property) {
    this.property = property;
    return this;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  setEnum(value) {
    this.enum = value;
    return this;
  }

  build() {
    this.model.validatesInclusionOf(this.property, {
      in: this.enum,
      message: `Must be one of these: ${this.enum.join(", ")}.`
    });
  }
}

module.exports = function enumeration() {
  return new Enumeration();
};
