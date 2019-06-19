import get from 'lodash/get';
import { action } from 'mobx';

import Token from '../models/Token';

import authStore from 'features/Auth/store';

const CURRENT_NAME = 'CURRENT_NAME';
const CURRENT_USER_NAME = 'CURRENT_USER_NAME';
const CURRENT_USER_ID = 'CURRENT_USER_ID';
const CURRENT_TOKEN = 'CURRENT_TOKEN';
const CURRENT_TOKEN_TTL = 'CURRENT_TOKEN_TTL';
const CURRENT_CREATED_AT = 'CURRENT_CREATED_AT';

class AuthController {
  constructor() {
    this.store = authStore;
  }

  startCache() {
    this.readCache();

    // Token validation
    if (!this.store.token.isValid()) {
      this.clearToken();
    } else {
      this.store.token.startTimer().then(() => {
        this.clearToken();
        // TODO: Request application to refresh or login again
      });
    }
  }

  @action writeCache({ created, id, ttl, userId, name }) {
    // TODO: app compability: localStore
    localStorage.setItem(CURRENT_USER_NAME, get(this.store, 'user.username'));
    localStorage.setItem(CURRENT_NAME, name);
    localStorage.setItem(CURRENT_USER_ID, userId);

    localStorage.setItem(CURRENT_TOKEN, id);
    localStorage.setItem(CURRENT_TOKEN_TTL, ttl);
    localStorage.setItem(CURRENT_CREATED_AT, created);

    this.store.isCached = true;

    this.readCache();
  }

  readCache() {
    this.readCachedUser();
    this.readCachedToken();
  }

  @action readCachedUser() {
    if (this.hasCachedUser()) {
      this.store.setUser({
        id: localStorage.getItem(CURRENT_USER_ID),
        name: localStorage.getItem(CURRENT_NAME),
        username: localStorage.getItem(CURRENT_USER_NAME)
      });

      this.store.isCached = true;
    }
  }

  @action readCachedToken() {
    if (this.hasCachedToked()) {
      this.store.setToken({
        id: localStorage.getItem(CURRENT_TOKEN),
        ttl: localStorage.getItem(CURRENT_TOKEN_TTL),
        createdAt: localStorage.getItem(CURRENT_CREATED_AT)
      });
    }
  }

  @action clearCache() {
    this.clearToken();
    localStorage.removeItem(CURRENT_NAME);
    localStorage.removeItem(CURRENT_USER_NAME);
    localStorage.removeItem(CURRENT_USER_ID);
    this.store.user = null;
    this.store.isCached = false;
  }

  @action clearToken() {
    this.store.token = Token.Empty;
    localStorage.removeItem(CURRENT_TOKEN);
    localStorage.removeItem(CURRENT_TOKEN_TTL);
    localStorage.removeItem(CURRENT_CREATED_AT);
  }

  // eslint-disable-next-line class-methods-use-this
  hasCachedToked() {
    return (
      localStorage.getItem(CURRENT_TOKEN) &&
      localStorage.getItem(CURRENT_TOKEN_TTL) &&
      localStorage.getItem(CURRENT_CREATED_AT)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  hasCachedUser() {
    return (
      localStorage.getItem(CURRENT_NAME) &&
      localStorage.getItem(CURRENT_USER_NAME) &&
      localStorage.getItem(CURRENT_USER_ID)
    );
  }
}

const authController = new AuthController();
export default authController;
