import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { Input, Select } from 'antd'

export const CustomInput = styled(Input)`
  background-color: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.dark?.t?.lighten5 ||
      typeformTheme?.color?.dark?.t?.lighten5};
`
export const StyledSelect = styled(Select)`
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: 50%;
    font-size: ${({ theme }) =>
      theme?.typography?.fontSize?.body1 ||
      typeformTheme?.typography?.fontSize?.body1};
  }
  .ant-select-selector {
    background-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten9 ||
      typeformTheme?.color?.dark?.t?.lighten9} !important;
    border-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten5 ||
      typeformTheme?.color?.dark?.t?.lighten5} !important;
  }
`
