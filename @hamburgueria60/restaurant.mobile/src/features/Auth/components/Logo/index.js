import React from 'react';

import logo from '../../assets/logo.png';

import * as classes from './index.module.scss';

export default function Logo() {
  return <img className={classes.logo} src={logo} alt="" />;
}
