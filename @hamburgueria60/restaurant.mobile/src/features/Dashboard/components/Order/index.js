import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import OrderIcon from '../OrderIcon';
import Title from '../Title';
import OrderTotal from '../OrderTotal';

import Box from 'infrastructure/shared/Box';
import overviewController from 'features/AddOrder/components/Overview/controller';
import overviewStore from 'features/AddOrder/components/Overview/store';
import { OVERVIEW } from 'features/AddOrder/constants';

const Order = function Order({ history, orderId }) {
  const handleClick = useCallback(() => {
    overviewController.resetTab();
    overviewStore.setCurrentOrderId(orderId);
    overviewController.fetchItems();
    history.push(OVERVIEW);
  }, [orderId]);

  return (
    <ListItem button key={orderId} onClick={handleClick}>
      <ListItemIcon>
        <OrderIcon orderId={orderId} />
      </ListItemIcon>

      <Box minWidth="0px" flex="1">
        <Title orderId={orderId} />
        <Box variant="body2" color="text.secondary">
          <OrderTotal orderId={orderId} />
        </Box>
      </Box>
    </ListItem>
  );
};

export default withRouter(Order);
