import React from 'react'
import { IndexPage } from './pages/index-page'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Layout } from './layouts/layout'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <IndexPage />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default App
