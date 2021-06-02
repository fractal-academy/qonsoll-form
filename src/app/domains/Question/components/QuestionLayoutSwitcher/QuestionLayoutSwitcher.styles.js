import { Menu } from 'antd'
import styled from 'styled-components'
import theme from 'app/styles/theme'

export const StyledMenu = styled(Menu)`
  background-color: ${theme.color.dark.t.lighten6};
  border-radius: ${theme.borderRadius.md};
  height: fit-content;
  border: none;
`
export const StyledItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.space[2]} !important;
`
