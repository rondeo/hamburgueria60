import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import Box from '../Box';

import { circularProgress, invisible } from './index.module.scss';

export default function ButtonWithLoading({
  children,
  loading,
  className,
  circularProgressProps,
  ...props
}) {
  return (
    <Box
      className={className}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button disabled={loading} {...props}>
        {loading ? <span className={invisible}>{children}</span> : children}
      </Button>
      {loading && (
        <CircularProgress
          size={16}
          className={circularProgress}
          {...circularProgressProps}
        />
      )}
    </Box>
  );
}
