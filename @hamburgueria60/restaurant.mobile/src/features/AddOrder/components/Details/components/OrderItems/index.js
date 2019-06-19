import { Observer } from 'mobx-react';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import controller from '../../controller';
import OrderItem from '../OrderItem';

import reverseMap from 'infrastructure/collections/reverseMap';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      marginTop: theme.spacing(3)
    },
    subheader: {
      lineHeight: 'inherit'
    }
  })
);

const Elements = function Elements({ orderItems }) {
  return reverseMap(orderItems, function cb(orderItem) {
    return <OrderItem key={orderItem.id} orderItemId={orderItem.id} />;
  });
};

const OrderItems = function OrderItems() {
  const orderItems = controller.getCachedOrderItems();
  const classes = useStyles();

  return (
    <Observer>
      {() =>
        orderItems.length ? (
          <List
            classes={{ root: classes.list }}
            subheader={
              <ListSubheader classes={{ root: classes.subheader }}>
                Itens
              </ListSubheader>
            }
          >
            <Elements orderItems={orderItems} />
          </List>
        ) : null
      }
    </Observer>
  );
};

export default OrderItems;
