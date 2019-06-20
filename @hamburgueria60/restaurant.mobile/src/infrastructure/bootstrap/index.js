import developmentOnly from './developmentOnly';
import startFontObserver from './startFontObserver';

import loading from 'infrastructure/bootstrap/loading';
import waitOnLoad from 'infrastructure/bootstrap/loading/waitOnLoad';
import debug from 'infrastructure/debug';

const log = debug('boostrap');

export default async function bootstrap() {
  await startFontObserver();

  log('importing render');
  const {
    default: render
  } = await import('infrastructure/bootstrap/loading/render');

  log('window.onload');
  await waitOnLoad();

  log('unrendering loading');
  await loading.unrender();

  log('call render()');
  await render();
}

developmentOnly();
