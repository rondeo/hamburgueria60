import AppBar from '@material-ui/core/AppBar';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/icons/Menu';
import React, { useCallback } from 'react';

import EmptyState from './components/EmptyState';
import LeftNav from './components/LeftNav';
import OrderList from './components/OrderList';
import dashboardController from './controller';
import leftNavStore from './components/LeftNav/store';

import { withRouter } from 'infrastructure/navigation/History';
import Box from 'infrastructure/shared/Box';
import {
  IconButton,
  LeftIconButton,
  Title as ToolbarTitle,
  Toolbar
} from 'infrastructure/shared/CompactToolbar';
import overviewController from 'features/AddOrder/components/Overview/controller';
import { OVERVIEW } from 'features/AddOrder/constants';

export default withRouter(function Dashboard({ history }) {
  const handleAddClick = useCallback(() => {
    overviewController.resetTab();
    dashboardController.createOrder();
    history.push(OVERVIEW);
  });

  const handleMenuClick = useCallback(() => {
    leftNavStore.open();
  });

  return (
    <Box display="flex" minHeight="1" flexDirection="column">
      <AppBar position="sticky">
        <Toolbar>
          <LeftIconButton aria-label="Menu" onClick={handleMenuClick}>
            <Menu />
          </LeftIconButton>
          <ToolbarTitle>Lista de pedidos</ToolbarTitle>
          <IconButton
            aria-label="Adicionar pedido"
            onClick={handleAddClick}
            data-e2e="Dashboard#AddButton"
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>

      <LeftNav />
      <EmptyState data-e2e="Dashboard#EmptyState" />
      <OrderList />
    </Box>
  );
});
