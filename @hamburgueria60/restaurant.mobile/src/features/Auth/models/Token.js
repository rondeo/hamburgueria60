import addSeconds from 'date-fns/add_seconds';
import isBefore from 'date-fns/is_before';

export default class Token {
  constructor(build) {
    this.id = build.id;
    this.createdAt = build.createdAt;
    this.ttl = build.ttl;
  }

  isValid() {
    if (!this.createdAt || !this.ttl) return false;

    const validUntil = addSeconds(new Date(this.createdAt), this.ttl);
    const now = new Date();
    const isStillValid = isBefore(now, validUntil);

    return isStillValid;
  }

  startTimer() {
    const date = addSeconds(new Date(this.createdAt), this.ttl);
    const now = new Date();
    const when = date.getTime() - now.getTime();

    return new Promise(resolve => {
      this.timer = setTimeout(() => {
        resolve();
      }, when);
    });
  }

  static Empty = new Token.Builder().build();

  static get Builder() {
    class Builder {
      withId(id) {
        this.id = id;
        return this;
      }

      withTimeToLive(ttl) {
        this.ttl = ttl;
        return this;
      }

      withCreationDate(date) {
        this.createdAt = date;
        return this;
      }

      build() {
        return new Token(this);
      }
    }

    return Builder;
  }
}
