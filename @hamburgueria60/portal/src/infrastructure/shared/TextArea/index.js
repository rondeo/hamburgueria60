import React from 'react';

import { textArea } from './index.module.scss';

export default function TextArea(props) {
  return <textarea className={textArea} {...props} />;
}
