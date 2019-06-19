import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import overviewController from '../../controller';
import overviewStore from '../../store';
import SendDialogContentError from '../SendDialogContentError';

import sendDialogStore from './store';

import { withRouter } from 'infrastructure/navigation/History';
import ButtonWithLoading from 'infrastructure/shared/ButtonWithLoading';
import { SENT } from 'infrastructure/repositories/orders/constants';

export default withRouter(function SendDialog({ history }) {
  const currentOrder = overviewController.getCurrentOrder();

  const handleCancelClick = useCallback(() => {
    if (!overviewStore.sendRequest.idle) return;

    sendDialogStore.hide();
  });

  const handleSendClick = useCallback(async () => {
    if (!overviewStore.sendRequest.idle) return;

    currentOrder.setStatus(SENT);

    const success = currentOrder.persisted
      ? await overviewController.update()
      : await overviewController.send();

    if (success) {
      sendDialogStore.hide();
      overviewController.resetTab();
      history.goBack();
    }
  });

  return (
    <Observer>
      {() => (
        <Dialog open={sendDialogStore.visible} onClose={handleCancelClick}>
          <DialogTitle>Confirmar envio do pedido?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Desejar finalizar o pedido e enviá-lo para preparo?
            </DialogContentText>
            <SendDialogContentError />
          </DialogContent>
          {!overviewStore.sendRequest.error ? (
            <DialogActions>
              {overviewStore.sendRequest.idle && (
                <Button onClick={handleCancelClick}>Cancelar</Button>
              )}
              <ButtonWithLoading
                loading={!overviewStore.sendRequest.idle}
                onClick={handleSendClick}
                color="primary"
                autoFocus
              >
                Enviar
              </ButtonWithLoading>
            </DialogActions>
          ) : (
            <DialogActions>ae</DialogActions>
          )}
        </Dialog>
      )}
    </Observer>
  );
});
