import theme from '../../../../../../styles/theme'

export const styles = {
  buttonM: { marginRight: '10px' },
  firstLetter: {
    marginRight: `${theme.grid.gutters.sm - 6}px`,
    border: '1px solid',
    borderColor: theme.color.dark.t.lighten4,
    paddingRight: `${theme.grid.gutters.sm / 2}px`,
    paddingLeft: `${theme.grid.gutters.sm / 2}px`,
    borderRadius: theme.borderRadius.sm
  }
}
