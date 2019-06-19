import amber from '@material-ui/core/colors/amber';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { createMuiTheme } from '@material-ui/core/styles';

const base = {
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: amber
  }
};

const light = createMuiTheme({
  ...base,
  palette: {
    ...base.palette,
    type: 'light'
  }
});

export const dark = createMuiTheme({
  ...base,
  palette: {
    ...base.palette,
    type: 'dark'
  }
});

export const purple = createMuiTheme({
  ...base,
  palette: {
    ...base.palette,
    type: 'dark'
  }
});

export default light;
