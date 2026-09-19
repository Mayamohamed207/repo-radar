import type { Preview } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from '../src/store/store'
import { theme } from '../src/theme/theme'
import { ToastProvider } from '../src/providers/ToastContext'
// @ts-expect-error 
import '../src/styles/variables.css'
// @ts-expect-error
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider>
            <Story />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview