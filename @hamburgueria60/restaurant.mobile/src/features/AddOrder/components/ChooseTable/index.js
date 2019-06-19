import AppBar from '@material-ui/core/AppBar';
import { observer } from 'mobx-react';
import React from 'react';

import { container } from './index.module.scss';
import chooseTableStore from './store';
import Table from './components/Table';
import Grid from './components/Grid';

import range from 'infrastructure/collections/range';
import {
  Toolbar,
  Title,
  BackButton
} from 'infrastructure/shared/CompactToolbar';

const Tables = observer(function Tables() {
  return range(0, chooseTableStore.total).map(i => (
    <Table key={`table-${i + 1}`} number={i + 1} />
  ));
});

function ChooseTable() {
  return (
    <div className={container}>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Title>Mesa</Title>
        </Toolbar>
      </AppBar>

      <Grid>
        <Tables />
      </Grid>
    </div>
  );
}

export default ChooseTable;
