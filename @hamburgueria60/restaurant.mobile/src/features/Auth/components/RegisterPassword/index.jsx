import Typography from '@material-ui/core/Typography';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import React, { useState, useCallback, useEffect } from 'react';
import useReactRouter from 'use-react-router';

import authController from '../../controller';
import authStore from '../../store';
import PatternLock from '../PatternLock';
import { peopleApi } from '../../api';
import Toolbar from '../Toolbar';

import { container } from './index.module.scss';

import getReadableErrorMessage from 'infrastructure/commons/getReadableErrorMessage';
import errorDialogStore from 'features/ErrorDialog/store';
import { DASHBOARD, AUTH } from 'features/constants';

export default function RegisterPassword() {
  const [canSavePassword, setCanSavePassword] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const { history } = useReactRouter();

  const handlePassword = useCallback(
    incoming => {
      setPasswords([...passwords, incoming.password]);
    },
    [passwords]
  );

  const getMessage = useCallback(() => {
    if (!canSavePassword) {
      return !passwords[0]
        ? 'Crie uma senha para você'
        : 'Confirme a sua senha';
    }
    return 'Carregando...';
  }, [canSavePassword, passwords[0]]);

  useEffect(() => {
    async function effect() {
      const found = uniq(passwords);
      const hasBoth = passwords.length === 2;
      const areUnique = found.length === 1;

      if (hasBoth && areUnique) {
        setCanSavePassword(true);

        try {
          // save password
          await peopleApi.update({ id: authStore.user.id, password: found[0] });
          // login
          const { data } = await peopleApi.login({
            username: get(authStore, 'user.username'),
            password: found[0]
          });

          authController.writeCache(data);
          history.push(DASHBOARD);
        } catch (e) {
          errorDialogStore.show({
            title: 'Accesso ao sistema',
            message: getReadableErrorMessage(e)
          });
          errorDialogStore.onClose(() => {
            history.push(AUTH);
          });
        }
      } else if (hasBoth) {
        errorDialogStore.show({
          title: 'Accesso ao sistema',
          message:
            'As senhas fornecidas não conferem. Por favor, tente novamente'
        });
        errorDialogStore.onClose(() => {
          setPasswords([]);
        });
      }
    }

    effect();
  }, [passwords]);

  return (
    <>
      <Toolbar />
      <div className={container}>
        <Typography color="textPrimary">{getMessage()}</Typography>
        <PatternLock disabled={canSavePassword} onChange={handlePassword} />
      </div>
    </>
  );
}
