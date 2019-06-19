import 'regenerator-runtime/runtime';
import bootstrap from './infrastructure/bootstrap';
import './index.scss';

(async () => {
  await bootstrap();
})().catch(err => {
  throw err;
});
