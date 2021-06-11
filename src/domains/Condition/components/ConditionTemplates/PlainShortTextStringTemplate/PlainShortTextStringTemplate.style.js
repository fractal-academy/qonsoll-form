import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { Button, Input, Select, Typography } from 'antd'

const { Text } = Typography

export const CustomText = styled(Text)(({ theme }) => ({
  color:
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
}))

export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme?.color?.primary?.t?.lighten7 || typeformTheme.color.primary.t.lighten7
}))

export const CustomInput = styled(Input)(({ theme }) => ({
  backgroundColor:
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9,
  border: '1px solid',
  borderColor:
    theme?.color?.dark?.t?.lighten5 || typeformTheme?.color?.dark?.t?.lighten5
}))

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
