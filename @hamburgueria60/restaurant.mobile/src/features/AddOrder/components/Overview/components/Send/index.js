import SendIcon from '@material-ui/icons/Send';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import overviewController from '../../controller';
import sendDialogStore from '../SendDialog/store';

import { SENT } from 'infrastructure/repositories/orders/constants';
import ordersController from 'infrastructure/repositories/orders/ordersController';
import { IconButton } from 'infrastructure/shared/CompactToolbar';

export default function Send() {
  const handleClick = useCallback(() => {
    sendDialogStore.show();
  });
  return (
    <Observer>
      {() => {
        const currentOrder = overviewController.getCurrentOrder();
        return currentOrder && currentOrder.status !== SENT ? (
          <IconButton
            onClick={handleClick}
            disabled={!ordersController.canSend(currentOrder.id)}
            aria-label="Enviar"
          >
            <SendIcon />
          </IconButton>
        ) : null;
      }}
    </Observer>
  );
}
