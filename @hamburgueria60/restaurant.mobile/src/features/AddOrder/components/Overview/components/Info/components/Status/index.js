import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react';
import React from 'react';

import { getOrderStatus } from '../../helpers';

export default observer(function Status({ orderId }) {
  return (
    <ListItem>
      <ListItemText primary="Status" secondary={getOrderStatus({ orderId })} />
    </ListItem>
  );
});
