import { Row } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'

export const PopoverSwitcherRow = styled(Row)`
  ${({ theme }) => `
    display: flex;
    border-radius: ${
      theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
    } ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md} 0 0;
    background: ${
      theme?.color?.text?.dark.secondary ||
      typeformTheme?.color?.text?.dark.secondary
    };
    width: 300px;
    cursor: pointer;
`}
`
