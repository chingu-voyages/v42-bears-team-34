import { createTheme } from '@mui/material';

export const THEME = createTheme({
  typography: {
    fontFamily: ['Gilda Display'],
    fontSize: 12,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '18px'
        }
      }
    }
  },
});
