import { Select } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'

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
