import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import controller from '../../controller';
import notSavedDialogStore from '../NotSavedDialog/store';

import ordersController from 'infrastructure/repositories/orders/ordersController';
import { BackButton } from 'infrastructure/shared/CompactToolbar';
import dashboardController from 'features/Dashboard/controller';

function Back({ history }) {
  const handleClick = useCallback(() => {
    const currentOrder = controller.getCurrentOrder();

    if (currentOrder.status === 'DRAFT') {
      if (ordersController.canDiscard(currentOrder.id)) {
        dashboardController.dropOrder();
        controller.dropOrder();
        controller.resetTab();
        history.goBack();
      } else if (currentOrder.changed) {
        notSavedDialogStore.show();
      } else {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  });

  return <BackButton preventDefault onClick={handleClick} />;
}

export default withRouter(Back);
