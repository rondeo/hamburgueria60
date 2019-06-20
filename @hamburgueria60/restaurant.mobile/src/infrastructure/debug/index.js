import noop from 'infrastructure/collections/noop';

function isDebugEnabled() {
  return localStorage.getItem('DEBUG_ENABLED') === 'true';
}

if (localStorage.getItem('DEBUG_ENABLED') == null) {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('DEBUG_ENABLED', true);
  } else {
    localStorage.setItem('DEBUG_ENABLED', false);
  }
}

export default function debug(context) {
  if (isDebugEnabled()) {
    return (...args) => {
      // eslint-disable-next-line no-console
      console.log(`[${context}]`, ...args);
    };
  }
  return noop;
}
