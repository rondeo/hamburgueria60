import AppBar from '@material-ui/core/AppBar';
import DoneIcon from '@material-ui/icons/Done';
import orders from 'infrastructure/store/orders/orders';
import React, { useCallback } from 'react';

import pizzaPicker, {
  classicFlavors,
  specialFlavors,
  premiumFlavors
} from '../../../stores/pizzaPicker';

import PizzaFlavorPicker from './PizzaFlavorPicker';
import PizzaSizePicker from './PizzaSizePicker';

import { withRouter } from 'infrastructure/navigation/History';
import Box from 'infrastructure/shared/Box';
import {
  BackButton,
  IconButton,
  Title as ToolbarTitle,
  Toolbar
} from 'infrastructure/shared/CompactToolbar';

const DoneButton = withRouter(function DoneButton({ history }) {
  const handleDoneClick = useCallback(() => {
    history.goBack();
    orders.currentOrder.addCurrentItem(pizzaPicker.getLabel());
    pizzaPicker.reset();
  });
  return (
    <IconButton aria-label="Adicionar pedido" onClick={handleDoneClick}>
      <DoneIcon />
    </IconButton>
  );
});

const PizzaPicker = function PizzaPicker() {
  return (
    <Box display="flex" minHeight="1" flexDirection="column">
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <ToolbarTitle>Pizza</ToolbarTitle>
          <DoneButton />
        </Toolbar>
      </AppBar>

      <Box>
        <PizzaSizePicker />
        <PizzaFlavorPicker
          label="Sabores tradicionais"
          flavors={classicFlavors}
        />
        <PizzaFlavorPicker label="Sabores especiais" flavors={specialFlavors} />
        <PizzaFlavorPicker label="Sabores premium" flavors={premiumFlavors} />
      </Box>
    </Box>
  );
};

export default PizzaPicker;
