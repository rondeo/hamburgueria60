import get from 'lodash/get';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import useReactRouter from 'use-react-router';

import { button } from './index.module.scss';

import store from 'features/Auth/store';
import Button from 'infrastructure/shared/ButtonWithLoading';
import { ThrowOn } from 'features/ErrorDialog/models/ThrowOn';
import { AUTH_PASSWORD, AUTH_REGISTER_PASSWORD } from 'features/Auth/constants';
import { peopleApi } from 'features/Auth/api';
import { DASHBOARD } from 'features/constants';

const NEED_AUTH = 'AUTHORIZATION_REQUIRED';
const verifyToken = peopleApi.verifyToken.bind(peopleApi);
const info = peopleApi.info.bind(peopleApi);

export default function NextWithUsername() {
  const builder = new ThrowOn.Builder()
    .withOptions({ title: 'Acesso ao sistema' })
    .withBefore(() => store.request.setIdle(false))
    .withAfter(() => store.request.setIdle(true));

  const { history } = useReactRouter();

  const handleClick = useCallback(async () => {
    const { data: user } = await builder
      .withAction(async () => info({ username: get(store, 'user.username') }))
      .build()
      .run();

    if (user.hasCredentials) {
      try {
        await builder
          .withAction(async () => verifyToken({ uid: get(store, 'user.id') }))
          .withFilter(e => get(e, 'response.data.error.code') === NEED_AUTH)
          .build()
          .run();

        history.push(DASHBOARD);
      } catch (e) {
        history.push(AUTH_PASSWORD);
      }
    } else {
      store.setUser({ ...store.user, id: user.id });
      history.push(AUTH_REGISTER_PASSWORD);
    }
  });

  return (
    <Observer>
      {() => (
        <Button
          className={button}
          fullWidth
          disabled={!get(store, 'user.username')}
          color="secondary"
          onClick={handleClick}
          loading={!store.request.idle}
          circularProgressProps={{ color: 'secondary' }}
        >
          Continuar como {get(store, 'user.username')}
        </Button>
      )}
    </Observer>
  );
}
