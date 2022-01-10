import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    background: {
      default: '#2a0a4a',
    },
    primary: {
      main: '#fd4b24',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: {
          borderRadius: 50,
          px: 5,
          py: 1.5,
        },
      },
    },
  },
})
