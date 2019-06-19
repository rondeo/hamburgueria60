import ListSubheader from '@material-ui/core/ListSubheader';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import pizzaPicker from '../../../stores/pizzaPicker';

import Box from 'infrastructure/shared/Box';
import ChipControl from 'infrastructure/shared/ChipControl';

const Flavor = function Flavor({ flavor }) {
  const handleFlavorChange = useCallback(() => {
    if (pizzaPicker.hasFlavor(flavor)) {
      pizzaPicker.removeFlavor(flavor);
    } else {
      pizzaPicker.addFlavor(flavor);
    }
  }, [flavor]);

  return (
    <Observer>
      {() => (
        <ChipControl
          checked={pizzaPicker.selectedFlavors[flavor.value]}
          value={flavor.value}
          label={flavor.label}
          onChange={handleFlavorChange}
        />
      )}
    </Observer>
  );
};

const Flavors = function Flavors({ flavors }) {
  return flavors.map(flavor => <Flavor key={flavor.label} flavor={flavor} />);
};

export default function PizzaFlavorPicker({ label, flavors }) {
  return (
    <Box mb={2}>
      <ListSubheader component="div">{label}</ListSubheader>
      <Box ml={2} mr={2} display="flex" flexDirection="row" flexWrap="wrap">
        <Flavors flavors={flavors} />
      </Box>
    </Box>
  );
}
