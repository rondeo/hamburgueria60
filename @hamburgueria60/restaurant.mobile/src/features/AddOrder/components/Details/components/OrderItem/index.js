import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

import store from '../../store';

import overviewController from 'features/AddOrder/components/Overview/controller';

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      backgroundColor: props =>
        props.selected ? theme.palette.primary.main : null
    }
  })
);

function View({ quantity, label, canSelect, selected, onClick }) {
  const classes = useStyles({ selected });

  return (
    <ListItem button={canSelect} onClick={onClick}>
      <ListItemAvatar>
        <Avatar classes={{ root: classes.avatar }} selected={selected}>
          {quantity}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={label.primary} secondary={label.secondary} />
    </ListItem>
  );
}

export default function OrderItem({ orderItemId }) {
  const order = overviewController.getCurrentOrder();
  const orderItem = order.orderItems.get(orderItemId);

  const handleClick = useCallback(() => {
    const isReleased = !store.selectedOrderItemId;
    const isNotSelected = store.selectedOrderItemId !== orderItemId;
    const canSelect = order.status === 'DRAFT';

    if (canSelect && (isReleased || isNotSelected)) {
      store.setSelectedOrderItemId(orderItemId);
    } else {
      store.setSelectedOrderItemId(null);
    }
  }, [orderItemId]);

  return (
    <Observer>
      {() => (
        <View
          quantity={orderItem.quantity}
          label={orderItem.label}
          canSelect={order.status === 'DRAFT'}
          selected={store.selectedOrderItemId === orderItemId}
          onClick={handleClick}
        />
      )}
    </Observer>
  );
}
