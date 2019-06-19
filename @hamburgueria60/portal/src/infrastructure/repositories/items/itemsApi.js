import Axios from 'axios';

import { Api } from '../../api';

class ItemsApi extends Api {
  findItems(params) {
    return Axios.get(`${this.url}/items`, { params });
  }

  findItemsById(ids) {
    return this.findItems({ filter: { where: { id: { inq: ids } } } });
  }
}

export default new ItemsApi();
