import React, { useCallback } from 'react';

import pickItemController from '../../controller';

import Sentinel from 'infrastructure/shared/Sentinel';

export default function ItemsSentinel(props) {
  const handleVisibilityChange = useCallback(ratio => {
    if (ratio > 0) {
      pickItemController.fetchNextPage();
    }
  });
  return <Sentinel {...props} onVisibilityChange={handleVisibilityChange} />;
}
