import React, { useCallback } from 'react';

import dashboardController from '../../controller';

import Sentinel from 'infrastructure/shared/Sentinel';

export default function OrdersSentinel(props) {
  const handleVisibilityChange = useCallback(ratio => {
    if (ratio > 0) {
      dashboardController.fetchNextPage();
    }
  });
  return <Sentinel {...props} onVisibilityChange={handleVisibilityChange} />;
}
