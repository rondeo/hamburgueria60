import block from 'bem-css-modules';
import UIPatternLock from 'patternlock';
import React, { useEffect, useCallback, useRef } from 'react';

import './index.scss';
import 'patternlock/dist/patternlock.css';
import style from './index.module.scss';

const b = block(style);

let lock;

function Lock({ onChange }) {
  const ref = useRef();
  const id = 'Auth__PatternLock--placeholder';

  const onDraw = useCallback(
    async password => {
      if (onChange) {
        onChange({ lock, password });
        lock.disable();
        lock.reset();
      }
    },
    [onChange]
  );

  useEffect(() => {
    lock = new UIPatternLock(`#${id}`, { onDraw, margin: 15 });
  }, []);

  useEffect(() => {
    if (lock) {
      lock.option('onDraw', onDraw);
      lock.enable();
    }
  }, [onDraw]);

  return <div ref={ref} id={id} />;
}

export default function PatternLock({ disabled, onChange }) {
  return (
    <div className={b({ disabled })}>
      <Lock onChange={onChange} />
    </div>
  );
}
