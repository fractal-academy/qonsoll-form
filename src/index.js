import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ThemeProvider } from 'styled-components'
import theme from 'app/config/theme/customTheme'
import './index.less'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
