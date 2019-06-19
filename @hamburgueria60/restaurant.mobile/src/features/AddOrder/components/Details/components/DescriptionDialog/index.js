import AppBar from '@material-ui/core/AppBar';
import MuiButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import detailsController from '../../controller';

import descriptionDialogStore from './store';
import { NEW } from './constants';

import Box from 'infrastructure/shared/Box';
import Toolbar, { LeftIconButton } from 'infrastructure/shared/CompactToolbar';
import TextArea from 'infrastructure/shared/TextArea';

function CustomTextArea() {
  const handleChange = useCallback(e => {
    descriptionDialogStore.setDescription(e.target.value);
  });
  return (
    <Observer>
      {() => (
        <TextArea
          value={descriptionDialogStore.description}
          onChange={handleChange}
          placeholder="Descreva as modificações do item. Ex: tirar cebola, queijo extra."
        />
      )}
    </Observer>
  );
}

function Button() {
  const handleDone = useCallback(() => {
    if (descriptionDialogStore.mode === NEW) {
      detailsController.addCustomItem(descriptionDialogStore.description);
    } else {
      detailsController.changeOrderItem(descriptionDialogStore.description);
    }
    descriptionDialogStore.hide();
  });
  return (
    <Observer>
      {() => (
        <MuiButton
          color="inherit"
          onClick={handleDone}
          disabled={!descriptionDialogStore.description.trim().length}
        >
          {descriptionDialogStore.mode === NEW ? 'Adicionar' : 'Editar'}
        </MuiButton>
      )}
    </Observer>
  );
}

function DialogContent() {
  const handleClose = useCallback(() => {
    descriptionDialogStore.hide();
  });
  return (
    <Box display="flex" flexDirection="column" height="1">
      <AppBar position="sticky">
        <Toolbar>
          <LeftIconButton aria-label="Fechar" onClick={handleClose}>
            <CloseIcon />
          </LeftIconButton>
          <Box flex="1" />
          <Button />
        </Toolbar>
      </AppBar>
      <Box display="flex" flex="1" width="1">
        <CustomTextArea />
      </Box>
    </Box>
  );
}

export default function DescriptionDialog() {
  const handleClose = useCallback(() => {
    descriptionDialogStore.hide();
  });
  return (
    <Observer>
      {() => (
        <Dialog
          fullScreen
          open={descriptionDialogStore.isVisible}
          onClose={handleClose}
        >
          <DialogContent />
        </Dialog>
      )}
    </Observer>
  );
}
