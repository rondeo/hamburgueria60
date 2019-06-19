import MuiBox from '@material-ui/core/Box';
import React from 'react';

function Box({ variant = 'body1', ...props }) {
  const moreProps = {};
  if (variant) {
    moreProps.fontFamily = `${variant}.fontFamily`;
    moreProps.fontSize = `${variant}.fontSize`;
    moreProps.fontWeight = `${variant}.fontWeight`;
  }
  return <MuiBox {...moreProps} {...props} />;
}

export default React.forwardRef((props, ref) => <Box {...props} ref={ref} />);
