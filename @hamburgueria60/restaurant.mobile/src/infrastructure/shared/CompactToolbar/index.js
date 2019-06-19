import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import useReactRouter from 'use-react-router';

import Box from '../Box';

import { title } from './index.module.scss';

const useStyles = makeStyles({
  toolbar: { paddingRight: 4 },
  iconButton: { marginLeft: '-12px', marginRight: '12px' }
});

export function Toolbar(props) {
  const classes = useStyles();
  return <MuiToolbar classes={{ root: classes.toolbar }} {...props} />;
}

export default Toolbar;

export function Title({ className, ...props }) {
  return <Box className={[title, className]} variant="h6" {...props} />;
}

export function IconButton(props) {
  return <MuiIconButton color="inherit" {...props} />;
}

export function LeftIconButton(props) {
  const classes = useStyles();
  return <IconButton classes={{ root: classes.iconButton }} {...props} />;
}

export function BackButton({ preventDefault, onClick, before, after }) {
  const { history } = useReactRouter();

  const next = useCallback(() => {
    history.goBack();
  });

  const handleClick = useCallback(() => {
    const isBlocked = before ? before(next) : false;
    if (!isBlocked) {
      if (!preventDefault) {
        history.goBack();
      }

      if (after) after();
    }
  });

  return (
    <LeftIconButton
      aria-label="Voltar"
      onClick={onClick || handleClick}
      data-e2e="Toolbar#BackButton"
    >
      <ArrowBack />
    </LeftIconButton>
  );
}
