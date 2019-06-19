import React from 'react';
import Typography from '@material-ui/core/Typography';

import { date } from './index.module.scss';

export default function OrderDate({ className, ...props }) {
  return (
    <Typography
      noWrap
      variant="caption"
      color="textSecondary"
      ml={2}
      className={[date, className]}
      {...props}
    />
  );
}
