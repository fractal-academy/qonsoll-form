import theme from 'app/styles/theme'

export const styles = {
  selectStyle: {
    width: '100%',
    height: '48px',
    display: 'flex',
    alignItems: 'center'
  },
  //?new styles
  mainContainer: {
    display: 'flex',
    border: `1px solid ${theme.color.white.t.lighten3}`,
    borderRadius: theme.borderRadius.md / 2,
    width: 420
  }
}
