import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from 'app'
import { ThemeProvider } from 'styled-components'
import theme from 'app/config/theme/customTheme'
import FormContextProvider from 'app/context/FormContext/FormContext'
import './index.less'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <FormContextProvider>
      <Router>
        <App />
      </Router>
    </FormContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
