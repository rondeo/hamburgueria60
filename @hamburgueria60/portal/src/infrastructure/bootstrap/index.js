import developmentOnly from './developmentOnly';
import startFontObserver from './startFontObserver';

import loading from 'infrastructure/bootstrap/loading';
import waitOnLoad from 'infrastructure/bootstrap/loading/waitOnLoad';

export default async function bootstrap() {
  await startFontObserver();

  const { default: render } = await import(
    'infrastructure/bootstrap/loading/render'
  );

  await loading.unrender();

  await waitOnLoad();

  await render();
}

developmentOnly();
