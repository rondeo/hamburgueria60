import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { item, avatar, text } from './index.module.scss';
import errorDialogStore from './store';

export default function ErrorDialog() {
  const handleClose = useCallback(() => {
    if (errorDialogStore.closeCallback) {
      errorDialogStore.closeCallback();
    }
    errorDialogStore.hide();
  });

  return (
    <Observer>
      {() =>
        errorDialogStore.visible && (
          <Dialog open={errorDialogStore.visible} onClose={handleClose}>
            <DialogTitle>{errorDialogStore.title}</DialogTitle>
            <DialogContent>
              <ListItem className={item}>
                <ListItemAvatar>
                  <Avatar className={avatar}>!</Avatar>
                </ListItemAvatar>
                <ListItemText className={text}>
                  {errorDialogStore.message}
                </ListItemText>
              </ListItem>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleClose}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </Observer>
  );
}
