import styled from 'styled-components'
import typeformTheme from '../../../../../styles/theme'
import theme from '../../../../../styles/theme'
import { Typography } from 'antd'
const { Text } = Typography

export const StyledText = styled(Text)`
  ${({ theme }) => `
  color:${
    theme?.color?.text?.dark?.secondary ||
    typeformTheme?.color?.text?.dark?.secondary
  }`}
`
