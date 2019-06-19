import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { withRouter } from 'infrastructure/navigation/History';
import itemsStore from 'infrastructure/repositories/items/itemsStore';
import { ADD_ITEMS_DETAILS, OVERVIEW } from 'features/AddOrder/constants';
import detailsController from 'features/AddOrder/components/Details/controller';
import detailsStore from 'features/AddOrder/components/Details/store';
import controller from 'features/AddOrder/components/Overview/controller';

export default withRouter(function OrderItem({ history, itemId }) {
  const handleClick = useCallback(() => {
    const { tag } = itemsStore.items.get(itemId);

    controller.resetTab();
    detailsController.reset();
    detailsStore.setCurrentItemId(itemId);

    history.push(ADD_ITEMS_DETAILS.replace(':friendlyUrl', tag), {
      from: OVERVIEW
    });
  }, [itemId]);

  return (
    <Observer>
      {() => {
        const currentOrder = controller.getCurrentOrder();
        const itemRef = currentOrder.items.get(itemId);
        const item = itemsStore.items.get(itemId);
        return (
          <ListItem key={itemId} button onClick={handleClick}>
            <ListItemAvatar>
              <Avatar>{itemRef.quantity}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item && item.name}
              secondary={item && item.categoryName}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        );
      }}
    </Observer>
  );
});
