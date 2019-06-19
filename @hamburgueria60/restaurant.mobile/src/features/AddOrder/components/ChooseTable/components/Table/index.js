import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import CardButton from '../CardButton';

import { withRouter } from 'infrastructure/navigation/History';
import Box from 'infrastructure/shared/Box';
import overviewController from 'features/AddOrder/components/Overview/controller';

const getColor = (selected, tableNumber, isTableAvailable) => {
  const color = 'secondary';
  let bgcolor;
  let textColor;

  if (tableNumber === selected) {
    bgcolor = 'primary.main';
    textColor = 'primary.contrastText';
  } else if (isTableAvailable) {
    bgcolor = `${color}.main`;
    textColor = `${color}.contrastText`;
  } else {
    bgcolor = '';
  }
  return { bgcolor, textColor };
};

function Table({ history, number }) {
  const currentOrder = overviewController.getCurrentOrder();

  const handleClick = useCallback(() => {
    const isChanging = Number(currentOrder.table) !== Number(number);
    if (isChanging) currentOrder.markChanged();

    currentOrder.setTable(number);
    history.goBack();
  }, [currentOrder]);

  return (
    <Observer>
      {() => {
        const selectedTable = Number(currentOrder.table);
        const { bgcolor, textColor } = getColor(number, selectedTable, true);

        return (
          <CardButton bgcolor={bgcolor} onClick={handleClick}>
            <Box color={textColor} variant="h6">
              {number}
            </Box>
          </CardButton>
        );
      }}
    </Observer>
  );
}

export default withRouter(Table);
