import ListSubheader from '@material-ui/core/ListSubheader';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import pizzaPicker, { sizes } from '../../../stores/pizzaPicker';

import Box from 'infrastructure/shared/Box';
import ChipControl from 'infrastructure/shared/ChipControl';

const RadioGroup = styled(MuiRadioGroup)`
  && {
    flex-flow: row wrap;
  }
`;

export default function PizzaSizePicker() {
  const handleChange = useCallback(e =>
    pizzaPicker.setSelectedSize(
      sizes.find(size => size.value === e.target.value)
    )
  );
  return (
    <Box mb={2}>
      <ListSubheader component="div">Tamanho</ListSubheader>
      <Box ml={2} mr={2}>
        <Observer>
          {() => (
            <RadioGroup
              value={
                pizzaPicker.selectedSize ? pizzaPicker.selectedSize.value : null
              }
              onChange={handleChange}
            >
              {sizes.map(size => (
                <ChipControl
                  key={size.value}
                  value={size.value}
                  label={size.label}
                />
              ))}
            </RadioGroup>
          )}
        </Observer>
      </Box>
    </Box>
  );
}
