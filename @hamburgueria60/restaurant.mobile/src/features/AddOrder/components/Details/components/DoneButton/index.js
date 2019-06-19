import DoneIcon from '@material-ui/icons/Done';
import React, { useCallback } from 'react';

import { withRouter } from 'infrastructure/navigation/History';
import { IconButton } from 'infrastructure/shared/CompactToolbar';
import { PICK_ITEM } from 'features/AddOrder/constants';

export default withRouter(function DoneButton({ history, location }) {
  const onDoneClick = useCallback(() => {
    if (location.state.from === PICK_ITEM) {
      history.go(-2);
    } else {
      history.goBack();
    }
  });
  return (
    <IconButton
      aria-label="Confirmar"
      onClick={onDoneClick}
      data-e2e="Details#Done"
    >
      <DoneIcon />
    </IconButton>
  );
});
