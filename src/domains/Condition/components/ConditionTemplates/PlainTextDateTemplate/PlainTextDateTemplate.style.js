import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { DatePicker, Select, Button, Typography } from 'antd'

const { Text } = Typography

export const CustomText = styled(Text)`
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme.color.primary.default};
`

export const CustomButton = styled(Button)`
  background-color: ${({ theme }) =>
    theme?.color?.primary?.t?.lighten7 ||
    typeformTheme?.color?.primary?.t?.lighten7};
  &:hover {
    background-color: ${({ theme }) =>
      theme?.color?.primary?.t?.lighten3 ||
      typeformTheme?.color?.primary?.t?.lighten3};
  }
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
  &:hover .ant-select-arrow {
    opacity: 0;
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
export const StyledDatePicker = styled(DatePicker)`
  flex: 1;
  background-color: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten9 ||
    typeformTheme?.color?.dark?.t?.lighten9} !important;
  
  
  border: 1px solid;
  border-color: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten5 ||
    typeformTheme?.color?.dark?.t?.lighten5} !important;
  
  display: flex;
  align-items: center;
  .ant-picker-clear {
      border-radius: 50%;
    background-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten8 ||
      typeformTheme?.color?.dark?.t?.lighten8} !important;
    }
  }
  .ant-select-clear {
    border-radius: 50%;
    font-size: ${({ theme }) =>
      theme?.typography?.fontSize?.body1 ||
      typeformTheme?.typography?.fontSize?.body1};
  }
`
