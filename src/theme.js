import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
        
        body {
          font-family: 'Noto Sans', sans-serif;
        }
      `,
        },
    },
});

export default theme;