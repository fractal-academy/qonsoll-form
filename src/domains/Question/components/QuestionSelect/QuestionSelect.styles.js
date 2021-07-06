import { Select, Typography } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'

const { Text } = Typography

export const StyledSelect = styled(Select)`
  ${({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: 50%;
    font-size: 14px;
  }
  &:hover .ant-select-arrow {
    opacity: 0;
  }
  .ant-select-selector {
    cursor: pointer !important;
    background-color: ${
      theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
    } !important;
    border-color: ${
      theme?.color?.dark?.t?.lighten5 || typeformTheme?.color?.dark?.t?.lighten5
    } !important;
  }
`}
`

export const StyledCaptionText = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 0px;
`
