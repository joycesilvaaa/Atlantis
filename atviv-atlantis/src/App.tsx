import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ThemeProvider } from '@mui/material';
import LightTheme from './shared/themes/Light';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
