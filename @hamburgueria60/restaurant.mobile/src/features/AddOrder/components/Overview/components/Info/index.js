import List from '@material-ui/core/List';
import { Observer } from 'mobx-react';
import React from 'react';

import controller from '../../controller';
import store from '../../store';
import { INFO } from '../../constants';

import Status from './components/Status';
import Table from './components/Table';
import Total from './components/Total';

const Content = function Content() {
  const currentOrder = controller.getCurrentOrder();
  return (
    <List>
      <Status orderId={currentOrder.id} />
      <Table orderId={currentOrder.id} />
      <Total orderId={currentOrder.id} />
    </List>
  );
};

export default function Info() {
  return <Observer>{() => store.tab === INFO && <Content />}</Observer>;
}
