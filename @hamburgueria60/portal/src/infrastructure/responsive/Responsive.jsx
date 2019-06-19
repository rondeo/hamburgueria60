import React from 'react';
import MediaQuery from 'react-responsive';

import { types } from './device';

const Responsive = ({ type, only = true, ...props }) => {
  const mediaQueryProps = {};
  const key = only ? 'withLimits' : 'withoutLimits';

  mediaQueryProps.minWidth = types[key][type].minWidth;
  mediaQueryProps.maxWidth = types[key][type].maxWidth;

  if (
    (!mediaQueryProps.minWidth && mediaQueryProps.minWidth !== 0) ||
    !mediaQueryProps.maxWidth
  )
    return null;
  if (mediaQueryProps.maxWidth === Number.MAX_SAFE_INTEGER) {
    delete mediaQueryProps.maxWidth;
  }

  return <MediaQuery {...props} {...mediaQueryProps} />;
};

export default Responsive;
