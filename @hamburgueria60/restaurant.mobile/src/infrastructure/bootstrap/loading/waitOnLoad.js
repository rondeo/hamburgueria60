export default function waitOnLoad() {
  return new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.onload = () => {
        resolve();
      };
    }
  });
}
