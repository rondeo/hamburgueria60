import React from 'react';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles } from '@material-ui/styles';
import block from 'bem-css-modules';
import get from 'lodash/get';

import styles from './index.module.scss';

const b = block(styles);

const size = 64;
const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      height: size,
      width: size,
      listStyleType: 'none',
      backgroundColor: ({ bgcolor }) => get(theme.palette, bgcolor)
    }
  })
);

export default function CardButton({
  bgcolor,
  children,
  disabled,
  invisible,
  ...props
}) {
  const classes = useStyles({ bgcolor });

  return (
    <Card
      classes={{ root: classes.card }}
      className={b(null, { disabled, invisible })}
      {...props}
    >
      <ButtonBase disableRipple={disabled} disableTouchRipple={disabled}>
        {children}
      </ButtonBase>
    </Card>
  );
}
