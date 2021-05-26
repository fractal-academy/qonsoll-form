import styled from 'styled-components'
import { Typography, Button } from 'antd'
import theme from 'app/styles/theme'
const { Text } = Typography

export const CustomText = styled(Text)`
  color: ${theme.color.text.dark.secondary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.caption1};
`
export const CustomApplyButton = styled(Button)`
  width: 100%;
`
