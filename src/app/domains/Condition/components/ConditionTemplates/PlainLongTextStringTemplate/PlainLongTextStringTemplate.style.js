import theme from 'app/styles/theme'

export const styles = {
  bgc: { backgroundColor: theme.color.primary.t.lighten7 },
  fontColor: { color: theme.color.primary.default },
  selectStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  boxWithSelect: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #bbbbbb',
    borderColor: theme.color.dark.t.lighten5
  }
}
