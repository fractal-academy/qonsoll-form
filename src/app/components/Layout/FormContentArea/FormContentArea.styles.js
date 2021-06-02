import theme from 'app/styles/theme'

export const styles = {
  contentRow: {
    display: 'flex',
    m: 4,
    height: '100%'
  },
  contentCol: {
    backgroundColor: theme.color.white.default,
    borderRadius: `${theme.borderRadius.md}`
  },
  footerButtons: {
    h: 'right',
    mb: 4,
    mx: 4
  }
}
