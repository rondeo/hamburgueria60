import Axios from 'axios';

import { Api } from 'infrastructure/api';

class PeopleApi extends Api {
  info({ username }) {
    return Axios.get(`${this.url}/People/${username}/info`);
  }

  login({ username, password }) {
    return Axios.post(`${this.url}/People/login`, { username, password });
  }

  logout() {
    return this.post(`${this.url}/People/logout`);
  }

  verifyToken({ uid }) {
    return this.get(`${this.url}/People/${uid}/verifyToken`);
  }

  update({ id, password }) {
    return this.patch(`${this.url}/People/${id}`, { password });
  }
}

export default new PeopleApi();
