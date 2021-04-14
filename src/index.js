import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ThemeProvider } from 'styled-components'
import theme from 'app/config/theme/customTheme'
import './index.less'
import FormContextProvider from './app/context/FormContext/FormContext'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
