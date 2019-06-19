import { Observer } from 'mobx-react';
import React from 'react';

import authStore from '../../store';
import CachedLogin from '../CachedLogin';
import DefaultLogin from '../DefaultLogin';
import Logo from '../Logo';

import { container, title, content } from './index.module.scss';

export default function User() {
  return (
    <div className={container}>
      <Logo />
      <div className={title}>restaurant</div>
      <div className={content}>
        <Observer>
          {() => (authStore.isCached ? <CachedLogin /> : <DefaultLogin />)}
        </Observer>
      </div>
    </div>
  );
}
