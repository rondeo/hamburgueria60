import Axios from 'axios';
import authStore from 'features/Auth/store';

export class Api {
  url = 'http://api.hamburgueria60.com';

  // eslint-disable-next-line class-methods-use-this
  get(url, options) {
    return Axios.get(url, {
      ...options,
      headers: { Authorization: authStore.token.id }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  post(url, data, options = {}) {
    return Axios.post(url, data, {
      ...options,
      headers: { Authorization: authStore.token.id }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  patch(url, data, options = {}) {
    return Axios.patch(url, data, {
      ...options,
      headers: { Authorization: authStore.token.id }
    });
  }
}

export default new Api();
