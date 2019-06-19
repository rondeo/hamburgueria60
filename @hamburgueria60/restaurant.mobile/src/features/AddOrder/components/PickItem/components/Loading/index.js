import CircularProgress from '@material-ui/core/CircularProgress';
import { Observer } from 'mobx-react';
import React from 'react';

import pickItemStore from '../../store';

import { wrapper } from './index.module.scss';

export default function Loading() {
  return (
    <div className={wrapper}>
      <Observer>
        {() => (
          <CircularProgress
            size={20}
            style={{
              display: !pickItemStore.fetchItemsRequest.idle ? 'block' : 'none'
            }}
          />
        )}
      </Observer>
    </div>
  );
}
