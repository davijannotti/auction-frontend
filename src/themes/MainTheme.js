import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    background: { default: '#05070a', paper: '#121212' },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // Cor quando o item ESTÁ selecionado
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.2)', // Azul suave (primary com opacidade)
            color: '#fff', // Cor do texto quando selecionado
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.3)', // Cor ao passar o mouse por cima do selecionado
            },
          },
        },
      },
    },
  },
});