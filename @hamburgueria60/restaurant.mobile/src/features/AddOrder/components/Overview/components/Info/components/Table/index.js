import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { withRouter } from 'infrastructure/navigation/History';
import { DRAFT } from 'infrastructure/repositories/orders/constants';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';
import Box from 'infrastructure/shared/Box';
import { CHOOSE_TABLE } from 'features/AddOrder/constants';

const EmptyState = function EmptyState() {
  return (
    <Box component="span" variant="body2" color="primary.main" fontWeight="500">
      Pressione para selecionar a mesa
    </Box>
  );
};

export default withRouter(function Table({ history, orderId }) {
  const order = ordersStore.orders.get(orderId);
  const canSelect = order.status === 'DRAFT';

  const handleClick = useCallback(() => {
    if (order.status === DRAFT) {
      history.push(CHOOSE_TABLE);
    }
  });

  return (
    <ListItem button={canSelect} onClick={handleClick}>
      <Observer>
        {() => (
          <ListItemText
            primary="Mesa"
            secondary={order.table || <EmptyState />}
          />
        )}
      </Observer>
    </ListItem>
  );
});
