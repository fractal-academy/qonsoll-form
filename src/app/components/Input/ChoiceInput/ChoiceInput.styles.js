import theme from 'app/styles/theme'

export const styles = {
  keyLetterStyles: {
    padding: '0px 5px 1px 5px',
    fontSize: '12px',
    border: '1px solid lightblue',
    color: theme.color.primary.default,
    backgroundColor: 'white'
  },
  textAreaStyles: {
    cursor: 'pointer',
    color: theme.color.primary.default
  },
  deleteBtnStyles: {
    position: 'absolute',
    right: -6,
    top: -6,
    cursor: 'pointer',
    backgroundColor: '#cacaca',
    fontSize: '10px'
  }
}
