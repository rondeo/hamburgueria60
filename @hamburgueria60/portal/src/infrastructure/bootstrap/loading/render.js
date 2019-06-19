import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as mobx from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import pt from 'react-intl/locale-data/pt';

import Routes from 'features/Routes';
import * as serviceWorker from 'infrastructure/bootstrap/serviceWorker';
import theme from 'infrastructure/theme/mui-theme';

export default function render() {
  addLocaleData(pt);
  /* develblock:start */
  // Global MobX
  window.mobx = mobx;
  // Enforce actions
  mobx.configure({ enforceActions: 'always' });
  // MobX React DevTools
  /* develblock:end */
  const Root = () => (
    <MuiThemeProvider theme={theme}>
      <IntlProvider locale="pt-BR">
        <Routes />
      </IntlProvider>
    </MuiThemeProvider>
  );
  // TODO: check when
  // if (process.env.NODE_ENV === 'production') {
  //   window.onbeforeunload = () =>
  //     'Tem certeza? Esta ação fará com que as informação não salvas sejam perdidas.';
  // }
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();

  ReactDOM.render(<Root />, document.querySelector('#root'));
}
