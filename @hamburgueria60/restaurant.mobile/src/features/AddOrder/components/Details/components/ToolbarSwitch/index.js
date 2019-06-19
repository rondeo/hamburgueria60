import CloseIcon from '@material-ui/icons/Close';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import detailsStore from '../../store';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';
import DoneButton from '../DoneButton';

import Toolbar, {
  BackButton,
  Title,
  LeftIconButton
} from 'infrastructure/shared/CompactToolbar';

export default function ToolbarSwitch() {
  const handleClose = useCallback(() => {
    detailsStore.setSelectedOrderItemId(null);
  });
  return (
    <Observer>
      {() =>
        detailsStore.selectedOrderItemId ? (
          <Toolbar>
            <LeftIconButton aria-label="Fechar" onClick={handleClose}>
              <CloseIcon />
            </LeftIconButton>
            <Title />
            <EditButton />
            <DeleteButton />
          </Toolbar>
        ) : (
          <Toolbar>
            <BackButton />
            <Title>Detalhes</Title>
            <DoneButton />
          </Toolbar>
        )
      }
    </Observer>
  );
}
