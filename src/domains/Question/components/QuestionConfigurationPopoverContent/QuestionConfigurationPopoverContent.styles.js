import { Row } from '@qonsoll/react-design'
import { Divider } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'

export const PopoverSwitcherRow = styled(Row)`
  ${({ theme }) => `
    display: flex;
    border-radius: ${
      theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
    } ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md} 0 0;
    cursor: pointer;
`}
`
export const CustomDivider = styled(Divider)`
  margin-top: 0px;
  margin-bottom: 0px;
  background: ${({ theme }) => theme?.color?.dark?.t?.lighten8};
  height: 2px;
`
