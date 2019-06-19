import FontFaceObserver from 'fontfaceobserver';

export default async function startFontObserver() {
  await Promise.all([
    new FontFaceObserver('Roboto', { weight: 300 }).load(null, 60000),
    new FontFaceObserver('Roboto', { weight: 400 }).load(null, 60000),
    new FontFaceObserver('Roboto', { weight: 500 }).load(null, 60000),
    new FontFaceObserver('Caveat').load(null, 60000)
  ]).catch(err => {
    // eslint-disable-next-line no-console
    console.warn('Some critical font are not available:', err);
  });
}
