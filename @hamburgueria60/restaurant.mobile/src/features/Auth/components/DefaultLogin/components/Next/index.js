import get from 'lodash/get';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import useReactRouter from 'use-react-router';

import { button } from './index.module.scss';

import authStore from 'features/Auth/store';
import { ThrowOn } from 'features/ErrorDialog/models/ThrowOn';
import Button from 'infrastructure/shared/ButtonWithLoading';
import { peopleApi } from 'features/Auth/api';
import { AUTH_PASSWORD, AUTH_REGISTER_PASSWORD } from 'features/Auth/constants';

const info = peopleApi.info.bind(peopleApi);

export default function Next() {
  const { history } = useReactRouter();

  const handleClick = useCallback(async () => {
    const builder = new ThrowOn.Builder()
      .withOptions({ title: 'Acesso ao sistema' })
      .withBefore(() => authStore.request.setIdle(false))
      .withAfter(() => authStore.request.setIdle(true));

    const { data: user } = await builder
      .withAction(async () =>
        info({ username: get(authStore, 'user.username') })
      )
      .build()
      .run();

    if (user.hasCredentials) {
      history.push(AUTH_PASSWORD);
    } else {
      authStore.setUser({ ...authStore.user, id: user.id });
      history.push(AUTH_REGISTER_PASSWORD);
    }
  });
  return (
    <Observer>
      {() => (
        <Button
          fullWidth
          className={button}
          disabled={!get(authStore, 'user.username')}
          color="secondary"
          onClick={handleClick}
          loading={!authStore.request.idle}
          circularProgressProps={{ color: 'secondary' }}
        >
          Continuar
        </Button>
      )}
    </Observer>
  );
}
