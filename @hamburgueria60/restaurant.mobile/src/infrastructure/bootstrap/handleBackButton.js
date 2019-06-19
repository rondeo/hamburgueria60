export default function handleBackButton() {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = () => {
    window.history.go(1);
  };
}
