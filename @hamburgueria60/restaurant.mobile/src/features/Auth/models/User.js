export default class User {
  constructor(build) {
    this.id = build.id;
    this.username = build.username;
    this.name = build.name;
  }

  static get Builder() {
    class Builder {
      withId(id) {
        this.id = id;
        return this;
      }

      withName(name) {
        this.name = name;
        return this;
      }

      withUsername(username) {
        this.username = username;
        return this;
      }

      build() {
        return new User(this);
      }
    }

    return Builder;
  }
}
