import { createTheme } from '@mui/material';
import { cyan, grey, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#B3B3B3',
      dark: '#B3B3B3',
      light: '#B3B3B3',
      contrastText: grey[900],
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#B3B3B3',
    },
    background: {
      paper: grey[900], // Cor de fundo escura
      default: grey[900], // Cor de fundo padrão
    },
    text: {
      primary: '#B3B3B3',  // Texto principal branco
      secondary: '#B3B3B3', // Texto secundário branco
    },
    action: {
      active: '#B3B3B3', // Ícones brancos
    },
  }
});
