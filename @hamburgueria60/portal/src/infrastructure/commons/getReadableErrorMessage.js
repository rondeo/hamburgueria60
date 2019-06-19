import get from 'lodash/get';

const messages = {
  OPERATION_NOT_ALLOWED:
    'Você não possui permissão para realizar esta operação.',
  LOGIN_FAILED:
    'Suas credenciais de acesso estão inválidas ou você não tem acesso à aplicação.',
  USERNAME_NOT_FOUND:
    'Não foi possível localizar seu usuário. Verifique se você o digitou corretamente.'
};

export default function getReadableErrorMessage(rootCause) {
  const errorCode = get(rootCause, 'response.data.error.code');
  const errorName = get(rootCause, 'response.data.error.name');
  const errorMessage = get(rootCause, 'response.data.error.message');

  const canYouHandleThis =
    messages[errorCode] ||
    messages[errorName] ||
    errorMessage ||
    (errorCode && `Contate o suporte com o código: ${errorCode}`);

  if (canYouHandleThis) {
    return canYouHandleThis;
  }

  // eslint-disable-next-line no-console
  console.error(rootCause);

  return 'Oops! Aconteceu um problema inesperado. Tente novamente agora ou mais tarde.';
}
