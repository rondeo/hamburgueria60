import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import React from 'react';

import { IconButton } from 'infrastructure/shared/CompactToolbar';
import { ITEMS } from 'features/AddOrder/components/Overview/constants';
import overviewStore from 'features/AddOrder/components/Overview/store';

export default observer(function AddButton({ onClick }) {
  return (
    overviewStore.tab === ITEMS && (
      <IconButton
        color="inherit"
        aria-label="Voltar"
        onClick={onClick}
        data-e2e="Overview#AddButton"
      >
        <AddIcon />
      </IconButton>
    )
  );
});
