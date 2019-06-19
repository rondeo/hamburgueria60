import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import controller from '../../controller';

import AddButton from './components/AddButton';

import { withRouter } from 'infrastructure/navigation/History';
import { SENT } from 'infrastructure/repositories/orders/constants';
import pickItemStore from 'features/AddOrder/components/PickItem/store';
import { PICK_ITEM } from 'features/AddOrder/constants';

export default withRouter(function Add({ history }) {
  const handleClick = useCallback(async () => {
    pickItemStore.pagination.reset();
    pickItemStore.setItems([]);
    history.push(PICK_ITEM);
  });

  return (
    <Observer>
      {() => {
        const order = controller.getCurrentOrder();
        return order.status !== SENT ? (
          <AddButton onClick={handleClick} />
        ) : null;
      }}
    </Observer>
  );
});
