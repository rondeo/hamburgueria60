import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observable, action } from 'mobx';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';

import descriptionDialogStore from '../DescriptionDialog/store';
import controller from '../../controller';

const useStyles = makeStyles({ item: { paddingLeft: 24, paddingRight: 24 } });

export const chooseTypeDialog = {
  open: observable.box(false),
  close: action(function close() {
    chooseTypeDialog.open.set(false);
  })
};

export default function ChooseTypeDialog() {
  const handleCustomItem = useCallback(() => {
    descriptionDialogStore.show();
    chooseTypeDialog.close();
  });
  const handleDefaultItemClick = useCallback(() => {
    controller.addDefaultItem();
    chooseTypeDialog.close();
  });
  const handleClose = useCallback(() => {
    chooseTypeDialog.close();
  });
  const classes = useStyles();
  return (
    <Observer>
      {() => (
        <Dialog open={chooseTypeDialog.open.get()} onClose={handleClose}>
          <DialogTitle>Tipo de inclusão</DialogTitle>
          <List>
            <ListItem
              classes={{ root: classes.item }}
              button
              onClick={handleDefaultItemClick}
            >
              <ListItemText
                primary="Padrão"
                secondary="Sem alterações no item"
              />
            </ListItem>
            <ListItem
              classes={{ root: classes.item }}
              button
              onClick={handleCustomItem}
            >
              <ListItemText
                primary="Customizado"
                secondary="Adiciona detalhes ao item"
              />
            </ListItem>
          </List>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Observer>
  );
}
