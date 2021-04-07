import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ThemeProvider } from 'styled-components'
import theme from 'app/config/theme/customTheme'
import './index.less'
import DisplayAllComponents from 'app/displayAllComponents'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    <DisplayAllComponents />
  </ThemeProvider>,
  document.getElementById('root')
)
