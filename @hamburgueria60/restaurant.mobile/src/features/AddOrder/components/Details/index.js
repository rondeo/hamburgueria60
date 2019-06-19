import AppBar from '@material-ui/core/AppBar';
import React from 'react';

import { container, body } from './index.module.scss';
import ToolbarSwitch from './components/ToolbarSwitch';
import Banner from './components/Banner';
import OrderItems from './components/OrderItems';
import BottomSummary from './components/BottomSummary';
import DescriptionDialog from './components/DescriptionDialog';

export default function DetailsView() {
  return (
    <div className={container}>
      <AppBar position="sticky">
        <ToolbarSwitch />
      </AppBar>
      <div className={body}>
        <Banner />
        <OrderItems />
      </div>
      <BottomSummary />

      <DescriptionDialog />
    </div>
  );
}
