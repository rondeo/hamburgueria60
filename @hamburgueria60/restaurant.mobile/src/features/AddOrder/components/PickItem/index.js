import AppBar from '@material-ui/core/AppBar';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { container } from './index.module.scss';
import Results from './components/Results';

import Toolbar, { BackButton } from 'infrastructure/shared/CompactToolbar';

@observer
export default class PickItem extends Component {
  render() {
    return (
      <div className={container}>
        <AppBar position="sticky">
          <Toolbar>
            <BackButton />
          </Toolbar>
        </AppBar>
        <Results />
      </div>
    );
  }
}
