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
  &:hover .ant-select-arrow {
    opacity: 0;
  }
  .ant-select-clear {
    border-radius: 50%;
    font-size: ${({ theme }) =>
      theme?.typography?.fontSize?.body1 ||
      typeformTheme?.typography?.fontSize?.body1};
  }
  .ant-select-selector {
    cursor: pointer !important;
    background-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten9 ||
      typeformTheme?.color?.dark?.t?.lighten9} !important;
    border-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten5 ||
      typeformTheme?.color?.dark?.t?.lighten5} !important;
  }
`
