import { Menu } from 'antd'
import styled from 'styled-components'
import theme from 'app/styles/theme'

export const StyledMenu = styled(Menu)`
  background-color: ${theme.color.dark.t.lighten6};
  border-radius: ${theme.borderRadius.md};
`
export const StyledItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.grid.paddings[1] / 2}px !important;
`
