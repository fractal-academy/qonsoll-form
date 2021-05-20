import theme from 'app/styles/theme'

export const styles = {
  bgc: { backgroundColor: '#d6e1f2' },
  fontColor: { color: '#1d6fdc' },
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
