import App from 'app'
import React from 'react'
import 'app/styles/index.css'
import 'app/styles/index.less'
import ReactDOM from 'react-dom'
import theme from 'app/styles/theme.js'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import FormContextProvider from 'app/context/FormContext/FormContext'

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
