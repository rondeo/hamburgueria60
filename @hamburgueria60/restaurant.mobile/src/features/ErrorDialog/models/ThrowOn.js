import errorDialogStore from '../store';

import getReadableErrorMessage from 'infrastructure/commons/getReadableErrorMessage';

export class ThrowOn {
  constructor(build) {
    this.action = build.action;
    this.before = build.before;
    this.after = build.after;
    this.options = build.options;
    this.filterCb = build.filterCb;
  }

  async run() {
    try {
      this.before();
      return await this.action();
    } catch (e) {
      let pause = false;

      if (this.filterCb) {
        pause = this.filterCb(e);
      }

      if (pause) {
        throw e;
      } else {
        errorDialogStore.show({
          ...this.options,
          message: getReadableErrorMessage(e)
        });
      }
    } finally {
      this.after();
    }

    return null;
  }

  static get Builder() {
    class Builder {
      withAction(action) {
        this.action = action;
        return this;
      }

      withBefore(before) {
        this.before = before;
        return this;
      }

      withAfter(after) {
        this.after = after;
        return this;
      }

      withOptions(options) {
        this.options = options;
        return this;
      }

      withFilter(filterCb) {
        this.filterCb = filterCb;
        return this;
      }

      build() {
        return new ThrowOn(this);
      }
    }
    return Builder;
  }
}
