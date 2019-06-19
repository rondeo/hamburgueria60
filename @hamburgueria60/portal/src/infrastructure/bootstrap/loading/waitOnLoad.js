export default function waitOnLoad() {
  return new Promise(resolve => {
    window.onload = () => {
      resolve();
    };
  });
}
