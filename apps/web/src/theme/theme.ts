import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-theme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#2da44e', dark: '#2c974b' },
        background: { default: '#f6f8fa', paper: '#ffffff' },
        text: { primary: '#1f2328', secondary: '#656d76' },
        divider: '#d0d7de',
        success: { main: '#1a7f37' },
        warning: { main: '#9a6700' },
        error: { main: '#cf222e' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#3fb950', dark: '#56d364' },
        background: { default: '#0d1117', paper: '#161b22' },
        text: { primary: '#e6edf3', secondary: '#8b949e' },
        divider: '#30363d',
        success: { main: '#3fb950' },
        warning: { main: '#d29922' },
        error: { main: '#f85149' },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
})