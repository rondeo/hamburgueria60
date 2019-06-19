import './loading.scss';
import './ripple.scss';

/* eslint-disable class-methods-use-this */
class Loading {
  unrender() {
    const root = document.querySelector('#root');
    root.classList.remove('loading');
    root.innerHTML = '';
  }
}

export default new Loading();
