import theme from 'app/styles/theme'
export const styles = {
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  headerRow: {
    bg: theme.color.white.default,
    py: 3,
    px: 4
  },
  questionContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    m: 4,
    borderRadius: theme.borderRadius.md,
    bg: theme.color.white.default
  }
}
