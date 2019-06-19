import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import React from 'react';
import block from 'bem-css-modules';
import { makeStyles, createStyles } from '@material-ui/styles';

import controller from '../../controller';
import store from '../../store';

import style from './index.module.scss';

import Currency from 'infrastructure/i18n/components/Currency';
import itemsStore from 'infrastructure/repositories/items/itemsStore';
import overviewController from 'features/AddOrder/components/Overview/controller';

// TODO: check if it is working
const b = block(style);

const ItemTotal = observer(function ItemTotal() {
  const itemTotal = controller
    .getCachedOrderItems()
    .reduce((total, orderItem) => {
      // TODO: price is coming from item
      const item = itemsStore.items.get(orderItem.itemId);
      return total + item.price * orderItem.quantity;
    }, 0);
  return <Currency value={itemTotal} />;
});

const ItemQuantity = observer(function ItemQuantity() {
  const order = overviewController.getCurrentOrder();
  const item = order.items.get(store.currentItemId);
  const quantity = item ? item.quantity : 0;
  return <Typography>{quantity}</Typography>;
});

const useStyles = makeStyles(theme =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  })
);

export default function BottomSummary() {
  const classes = useStyles();

  return (
    <div className={[b('wrapper'), classes.wrapper]}>
      <div className={b('line')}>
        <Typography>Quantidade</Typography>
        <ItemQuantity />
      </div>
      <div className={b('line', { bold: true })}>
        <Typography>Total</Typography>
        <Typography>
          <ItemTotal />
        </Typography>
      </div>
    </div>
  );
}
