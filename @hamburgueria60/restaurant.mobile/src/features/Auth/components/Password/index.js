import { Typography } from '@material-ui/core';
import get from 'lodash/get';
import { Observer } from 'mobx-react';
import React, { useCallback } from 'react';
import useReactRouter from 'use-react-router';

import authController from '../../controller';
import authStore from '../../store';
import PatternLock from '../PatternLock';
import { peopleApi } from '../../api';
import Toolbar from '../Toolbar';

import { container } from './index.module.scss';

import getReadableErrorMessage from 'infrastructure/commons/getReadableErrorMessage';
import errorDialogStore from 'features/ErrorDialog/store';
import { DASHBOARD } from 'features/constants';

export default function Password() {
  const { history } = useReactRouter();
  const handlePassword = useCallback(async ({ lock, password }) => {
    try {
      authStore.request.setIdle(false);
      const { data } = await peopleApi.login({
        username: get(authStore, 'user.username'),
        password
      });
      authController.writeCache(data);
      history.push(DASHBOARD);
    } catch (e) {
      // Reset the drawn pattern
      lock.enable();

      const message = getReadableErrorMessage(e);
      errorDialogStore.show({ message, title: 'Acesso ao sistema' });
    } finally {
      authStore.request.setIdle(true);
    }
  });

  return (
    <Observer>
      {() => (
        <>
          <Toolbar />
          <div className={container}>
            <Typography color="textPrimary">
              {authStore.request.idle ? 'Insira sua senha' : 'Carregando...'}
            </Typography>
            <PatternLock
              disabled={!authStore.request.idle}
              onChange={handlePassword}
            />
          </div>
        </>
      )}
    </Observer>
  );
}
