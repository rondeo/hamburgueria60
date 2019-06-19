import React from 'react';
import { FormattedNumber } from 'react-intl';

export default function Currency({ value, style = 'currency', ...props }) {
  return (
    // eslint-disable-next-line react/style-prop-object
    <FormattedNumber value={value} style={style} currency="BRL" {...props} />
  );
}
