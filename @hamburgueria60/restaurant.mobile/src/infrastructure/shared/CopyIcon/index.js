import React from 'react';

import { copyIcon } from './index.module.scss';
import { ReactComponent as CopyIconSVG } from './assets/CopyIcon.svg';

export default function CopyIcon({ className, ...props }) {
  return <CopyIconSVG className={[copyIcon, className]} {...props} />;
}
