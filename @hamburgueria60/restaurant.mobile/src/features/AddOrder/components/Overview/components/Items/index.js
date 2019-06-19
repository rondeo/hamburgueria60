import List from '@material-ui/core/List';
import { Observer, observer } from 'mobx-react';
import React from 'react';

import controller from '../../controller';
import store from '../../store';
import { ITEMS } from '../../constants';

import EmptyState from './components/EmptyState';
import Item from './components/Item';
import Loading from './components/Loading';

const ItemList = function OrderItems() {
  const currentOrder = controller.getCurrentOrder();
  return (
    <List>
      <Observer>
        {() =>
          currentOrder.items.map(item => (
            <Item key={item.id} itemId={item.id} />
          ))
        }
      </Observer>
    </List>
  );
};

export default observer(function Items() {
  const currentOrder = controller.getCurrentOrder();
  if (store.tab === ITEMS && store.fetchItemsRequest.idle) {
    return currentOrder.items.length ? <ItemList /> : <EmptyState />;
  }
  return <Loading />;
});
