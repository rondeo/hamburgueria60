import developmentOnly from './developmentOnly';
import handleBackButton from './handleBackButton';
import startFontObserver from './startFontObserver';

import authController from 'features/Auth/controller';
import loading from 'infrastructure/bootstrap/loading';
import waitOnLoad from 'infrastructure/bootstrap/loading/waitOnLoad';

export default async function bootstrap() {
  await startFontObserver();

  // Cache loading
  authController.startCache();

  // Back button handling
  handleBackButton();

  const {
    default: render
  } = await import('infrastructure/bootstrap/loading/render');

  await loading.unrender();

  await waitOnLoad();

  await render();
}

developmentOnly();
