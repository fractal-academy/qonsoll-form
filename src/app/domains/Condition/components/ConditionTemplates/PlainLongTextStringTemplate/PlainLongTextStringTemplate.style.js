import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Input } from 'antd'

export const styles = {
  bgc: { backgroundColor: theme.color.primary.t.lighten7 },
  fontColor: { color: theme.color.primary.default },
  selectStyle: {
    marginRight: theme.space[2],
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  boxWithSelect: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid red',
    borderColor: theme.color.dark.t.lighten5
  }
}
export const CustomInput = styled(Input)`
  margin-right: 32px;
  background-color: ${theme.color.dark.t.lighten9};
  border: 1px solid ${theme.color.dark.t.lighten5};
`
