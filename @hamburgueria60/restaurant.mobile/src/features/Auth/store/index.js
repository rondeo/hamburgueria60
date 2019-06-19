import { observable, action } from 'mobx';

import User from '../models/User';
import Token from '../models/Token';

import Request from 'infrastructure/repositories/common/Request';

class AuthStore {
  @observable user;

  @observable token = Token.Empty;

  @observable isCached;

  request = new Request();

  @action setUser({ id, name, username }) {
    this.user = new User.Builder()
      .withId(id)
      .withName(name)
      .withUsername(username)
      .build();
  }

  @action setToken({ id, ttl, createdAt }) {
    this.token = new Token.Builder()
      .withId(id)
      .withTimeToLive(ttl)
      .withCreationDate(createdAt)
      .build();
  }
}

const authStore = new AuthStore();

if (process.env.NODE_ENV === 'development') {
  window.authStore = authStore;
}

export default authStore;
