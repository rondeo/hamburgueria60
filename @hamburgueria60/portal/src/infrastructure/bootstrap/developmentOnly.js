export default function developmentOnly() {
  if (process.env.NODE_ENV !== 'production ') {
    // eslint-disable-next-line consistent-return
    window.require = module => {
      switch (module) {
        case 'mobx':
          // eslint-disable-next-line global-require
          return require('mobx');
        default:
          break;
      }
    };
  }
}
