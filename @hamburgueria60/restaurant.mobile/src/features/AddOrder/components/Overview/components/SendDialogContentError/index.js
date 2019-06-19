import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Observer } from 'mobx-react';

import overviewStore from '../../store';

const useStyles = makeStyles(theme =>
  createStyles({
    item: { padding: 0 },
    avatar: { backgroundColor: theme.palette.error.main },
    text: {
      color: theme.palette.error.main
    }
  })
);

export default (function SendDialogContentError() {
  const classes = useStyles();

  return (
    <Observer>
      {() =>
        overviewStore.sendRequest.error ? (
          <ListItem classes={{ root: classes.item }}>
            <ListItemAvatar>
              <Avatar classes={{ root: classes.avatar }}>!</Avatar>
            </ListItemAvatar>
            <ListItemText classes={{ root: classes.text }}>
              {overviewStore.sendRequest.message ||
                'Aconteceu algo errado, porém não conseguimos identificar o motivo.'}
            </ListItemText>
          </ListItem>
        ) : null
      }
    </Observer>
  );
});
