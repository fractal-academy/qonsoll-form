import { Menu } from 'antd'
import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'

export const StyledMenu = styled(Menu)`
  ${({ theme }) => `
  background-color: ${
    theme?.color?.dark?.t?.lighten6 || typeformTheme?.color?.dark?.t?.lighten6
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  height: fit-content;
  border: none;
`}
`
export const StyledItem = styled(Menu?.Item)`
  ${({ theme }) => `
  display: flex;
  align-items: center;
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  padding: ${theme?.space[2] || typeformTheme?.space[2]} !important;
`}
`
