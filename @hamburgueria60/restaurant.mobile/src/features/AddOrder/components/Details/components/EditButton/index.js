import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback } from 'react';

import controller from '../../controller';
import descriptionDialogStore from '../DescriptionDialog/store';
import { EXISTING } from '../DescriptionDialog/constants';

import { IconButton } from 'infrastructure/shared/CompactToolbar';

export default function EditButton() {
  const orderItem = controller.getOrderItem();

  const handleClick = useCallback(() => {
    descriptionDialogStore.setMode(EXISTING);
    descriptionDialogStore.setDescription(orderItem.label.primary);
    descriptionDialogStore.setOrderItemId(orderItem.id);
    descriptionDialogStore.show();
  });

  return !orderItem.isDefault() ? (
    <IconButton aria-label="Editar" onClick={handleClick}>
      <EditIcon />
    </IconButton>
  ) : null;
}
