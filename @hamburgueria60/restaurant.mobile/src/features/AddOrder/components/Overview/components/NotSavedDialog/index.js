import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import controller from '../../controller';
import overviewStore from '../../store';
import SendDialogContentError from '../SendDialogContentError';

import store from './store';

import { withRouter } from 'infrastructure/navigation/History';
import ButtonWithLoading from 'infrastructure/shared/ButtonWithLoading';

export default withRouter(function NotSavedDialog({ history }) {
  const handleCancelClick = useCallback(() => {
    store.hide();
  });
  const handleConfirmClick = useCallback(async () => {
    const currentOrder = controller.getCurrentOrder();
    const success = currentOrder.persisted
      ? await controller.update()
      : await controller.send();

    if (success) {
      currentOrder.unmarkChanged();
      store.hide();
      controller.resetTab();
      history.goBack();
    }
  });
  return (
    <Observer>
      {() => (
        <Dialog open={store.visible} onClose={handleCancelClick}>
          <DialogTitle>Salvar como rascunho?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seu pedido não foi finalizado. Deseja salvá-lo como rascunho para
              enviá-lo posteriormente?
            </DialogContentText>

            <SendDialogContentError />
          </DialogContent>

          <DialogActions>
            {overviewStore.sendRequest.idle ? (
              <Button onClick={handleCancelClick}>Cancelar</Button>
            ) : null}
            <ButtonWithLoading
              loading={!overviewStore.sendRequest.idle}
              onClick={handleConfirmClick}
              color="primary"
              autoFocus
            >
              {!overviewStore.sendRequest.error ? 'Salvar' : 'Tentar novamente'}
            </ButtonWithLoading>
          </DialogActions>
        </Dialog>
      )}
    </Observer>
  );
});
