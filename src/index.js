import App from 'app'
import React from 'react'
import 'app/styles/index.css'
import 'app/styles/index.less'
import ReactDOM from 'react-dom'
import theme from 'app/styles/theme.js'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)
