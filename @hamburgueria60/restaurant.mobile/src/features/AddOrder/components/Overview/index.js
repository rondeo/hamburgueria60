import AppBar from '@material-ui/core/AppBar';
import React from 'react';

import Back from './components/Back';
import Add from './components/Add';
import Send from './components/Send';
import Items from './components/Items';
import Info from './components/Info';
import Navigation from './components/Navigation';
import NotSavedDialog from './components/NotSavedDialog';
import SendDialog from './components/SendDialog';

import Box from 'infrastructure/shared/Box';
import { Toolbar, Title } from 'infrastructure/shared/CompactToolbar';

export default function Overview() {
  return (
    <Box display="flex" minHeight="1" flexDirection="column">
      <AppBar position="sticky">
        <Toolbar>
          <Back />
          <Title>Pedido</Title>
          <Add />
          <Send />
        </Toolbar>
      </AppBar>

      <Info />
      <Items />

      <Box mt="auto" position="sticky" bottom="0">
        <Navigation />
      </Box>

      <NotSavedDialog />
      <SendDialog />
    </Box>
  );
}
