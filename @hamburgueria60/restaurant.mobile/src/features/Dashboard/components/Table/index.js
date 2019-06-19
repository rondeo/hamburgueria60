import React from 'react';
import Typography from '@material-ui/core/Typography';

import { table } from './index.module.scss';

export default function Table({ className, ...props }) {
  return (
    <Typography
      className={[table, className]}
      noWrap
      variant="body1"
      {...props}
    />
  );
}
