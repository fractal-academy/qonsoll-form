import { Menu } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'

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
  padding: ${theme?.space?.[2] || typeformTheme?.space[2]} !important;
  // margin:0 !important;
  &:last-child {
  border-bottom-left-radius:${
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
  };
  border-bottom-right-radius:${
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
  };
  }
  &:first-child {
  border-top-left-radius:${
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
  };
  border-top-right-radius:${
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
  };
  }
`}
`
