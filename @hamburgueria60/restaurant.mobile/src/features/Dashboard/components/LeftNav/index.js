import Drawer from '@material-ui/core/Drawer';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import LeftNavContent from '../LeftNavContent';

import leftNavStore from './store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 240,
      width: 'calc(100% - 56px)',
      background: 'linear-gradient(200deg, #301859f2 0%, #a76969f5 80%);',

      display: 'flex'
    }
  })
);

export default function LeftNav() {
  const handleClose = useCallback(() => {
    leftNavStore.close();
  });

  const classes = useStyles();

  return (
    <Observer>
      {() => (
        <Drawer
          open={leftNavStore.isOpen}
          onClose={handleClose}
          PaperProps={{ classes, component: 'nav' }}
        >
          <LeftNavContent />
        </Drawer>
      )}
    </Observer>
  );
}
