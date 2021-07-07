import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { Button, Typography } from 'antd'

const { Text } = Typography

export const CustomText = styled(Text)`
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
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
