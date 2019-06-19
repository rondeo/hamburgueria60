import React from 'react';

import { grid } from './index.module.scss';

export default function Grid({ className, ...props }) {
  return <div className={[grid, className]} {...props} />;
}
