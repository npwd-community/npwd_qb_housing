import { common, cyan } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';

export const HOUSE_APP_PRIMARY_COLOR = cyan[500];
export const HOUSE_APP_TEXT_COLOR = common.white;

export const theme: ThemeOptions = {
  palette: {
    primary: {
      main: HOUSE_APP_PRIMARY_COLOR,
      dark: cyan[900],
      light: cyan[500],
      contrastText: HOUSE_APP_TEXT_COLOR,
    },
    secondary: {
      main: cyan[500],
      dark: cyan[900],
      light: cyan[500],
      contrastText: HOUSE_APP_TEXT_COLOR,
    },
  },
};
