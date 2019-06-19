import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';

import store from '../../store';
import { ITEMS_LABEL, INFO_LABEL } from '../../constants';

function Navigation() {
  const handleChange = useCallback((_, tab) => {
    store.setTab(tab);
  });
  return (
    <Observer>
      {() => (
        <BottomNavigation value={store.tab} onChange={handleChange} showLabels>
          <BottomNavigationAction label={ITEMS_LABEL} icon={<ListIcon />} />
          <BottomNavigationAction label={INFO_LABEL} icon={<InfoIcon />} />
        </BottomNavigation>
      )}
    </Observer>
  );
}

export default Navigation;
