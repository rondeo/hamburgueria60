import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback } from 'react';

import controller from '../../controller';

import { IconButton } from 'infrastructure/shared/CompactToolbar';

export default function DeleteButton() {
  const handleClick = useCallback(() => {
    controller.decrementQuantity(1);
  });
  return (
    <IconButton aria-label="Remover" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  );
}
