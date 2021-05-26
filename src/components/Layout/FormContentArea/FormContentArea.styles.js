import theme from '../../../../styles/theme'

export const styles = {
  contentRow: {
    display: 'flex',
    m: 4,
    height: '100%',
    overflow: 'auto'
  },
  contentCol: {
    backgroundColor: theme.color.white.default,
    p: 3,
    overflow: 'auto',
    borderRadius: `${theme.grid.gutters.sm - 4}px`
  },
  footerButtons: {
    h: 'right',
    mb: 4,
    mx: 4
  }
}
