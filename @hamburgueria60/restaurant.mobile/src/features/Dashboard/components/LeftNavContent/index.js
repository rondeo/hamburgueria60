import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import get from 'lodash/get';
import React, { useCallback } from 'react';
import useReactRouter from 'use-react-router';

import leftNavStore from '../LeftNav/store';

import { header } from './index.module.scss';

import { purple } from 'infrastructure/theme/mui-theme';
import { peopleApi } from 'features/Auth/api';
import { AUTH } from 'features/constants';
import authController from 'features/Auth/controller';
import authStore from 'features/Auth/store';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      marginTop: 'auto',
      maxHeight: '100%',
      overflow: 'auto'
    },
    item: {
      flexShrink: 0
    },
    icon: {
      minWidth: 0,
      paddingRight: theme.spacing(2)
    },
    iconButton: {
      marginTop: '-12px',
      marginLeft: '-12px'
    },
    primary: {
      color: theme.palette.primary.contrastText
    }
  })
);

export default function LeftNavContent() {
  const { history } = useReactRouter();
  const classes = useStyles();

  const handleMenuClick = useCallback(() => {
    leftNavStore.close();
  });

  const handleLogout = useCallback(async () => {
    leftNavStore.close();
    history.push(AUTH);
    peopleApi.logout();
    authController.clearToken();
  });

  return (
    <ThemeProvider theme={purple}>
      <header className={header}>
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={handleMenuClick}
        >
          <Menu />
        </IconButton>
        <Typography color="textPrimary" variant="body1">
          {get(authStore, 'user.name')}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          @{get(authStore, 'user.username')}
        </Typography>
      </header>

      <List classes={{ root: classes.list }}>
        <ListItem button component="li" onClick={handleLogout}>
          <ListItemIcon classes={{ root: classes.icon }}>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} primary="Sair" />
        </ListItem>
      </List>
    </ThemeProvider>
  );
}
