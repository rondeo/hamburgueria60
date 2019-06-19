import CircularProgress from '@material-ui/core/CircularProgress';
import { Observer } from 'mobx-react';
import React from 'react';

import { wrapper } from './index.module.scss';

import dashboardStore from 'features/Dashboard/store';

export default function Loading() {
  return (
    <div className={wrapper}>
      <Observer>
        {() => (
          <CircularProgress
            size={20}
            style={{
              display: !dashboardStore.fetchOrdersRequest.idle
                ? 'block'
                : 'none'
            }}
          />
        )}
      </Observer>
    </div>
  );
}
