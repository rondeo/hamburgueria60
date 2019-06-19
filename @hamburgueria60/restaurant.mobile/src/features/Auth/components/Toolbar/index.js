import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

import {
  Toolbar as DefaultToolbar,
  BackButton
} from 'infrastructure/shared/CompactToolbar';

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
    marginBottom: 'auto',
    backgroundColor: 'transparent'
  }
});

export default function Toolbar() {
  const classes = useStyles();

  return (
    <AppBar classes={{ root: classes.root }} position="sticky">
      <DefaultToolbar>
        <BackButton />
      </DefaultToolbar>
    </AppBar>
  );
}
