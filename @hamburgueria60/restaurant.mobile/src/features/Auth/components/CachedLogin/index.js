import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';

import authController from '../../controller';

import NextWithUsername from './components/NextWithUsername';

export default function CachedLogin() {
  const handleClick = useCallback(() => {
    authController.clearCache();
  });
  return (
    <>
      <NextWithUsername />
      <Typography variant="caption" align="center">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={handleClick} color="textPrimary">
          Entrar com outra conta
        </Link>
      </Typography>
    </>
  );
}
