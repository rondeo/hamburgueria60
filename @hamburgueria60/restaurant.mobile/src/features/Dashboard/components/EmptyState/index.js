import { observer } from 'mobx-react';
import React from 'react';

import dashboardStore from '../../store';

import ordersStore from 'infrastructure/repositories/orders/ordersStore';
import Box from 'infrastructure/shared/Box';

export default observer(function EmptyState(props) {
  if (!dashboardStore.fetchOrdersRequest.idle || ordersStore.orders.length) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
      alignItems="center"
      ml={2}
      mr={2}
      {...props}
    >
      <Box
        mt="auto"
        mb={1}
        textAlign="center"
        fontWeight="300"
        color="text.secondary"
        variant="h5"
      >
        Nenhum pedido foi criado
      </Box>
      <Box
        mb="auto"
        textAlign="center"
        fontWeight="300"
        color="text.secondary"
        variant="h6"
      >
        Clique em (+) para criar um pedido
      </Box>
    </Box>
  );
});
