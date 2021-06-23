import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { Button, Typography } from 'antd'

const { Text } = Typography

export const CustomText = styled(Text)(({ theme }) => ({
  color:
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
}))

export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme?.color?.primary?.t?.lighten7 || typeformTheme.color.primary.t.lighten7
}))
