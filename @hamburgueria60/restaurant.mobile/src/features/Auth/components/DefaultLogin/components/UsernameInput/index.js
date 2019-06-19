import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import indexOf from 'lodash/indexOf';
import { Observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';

import { input } from './index.module.scss';

import authStore from 'features/Auth/store';

const setUsername = debounce(username => {
  authStore.setUser({ username });
}, 250);

export default function UsernameInput({ className, ...props }) {
  const [value, setValue] = useState('');

  const handleChange = useCallback(e => {
    const username = e.target.value || '';
    setValue(username);
    setUsername(username.toLowerCase());
  });

  const handleKeyDown = useCallback(e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();

      const form = e.target.form;
      const index = indexOf(form, e.target);
      form.elements[index + 1].focus();
    }
  });

  return (
    <Observer>
      {() => (
        <TextField
          {...props}
          className={classNames(input, className)}
          label="Quem é você?"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoCorrect="off"
          autoCapitalize="none"
        />
      )}
    </Observer>
  );
}
