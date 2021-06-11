import { Typography } from 'antd'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'

const { Text } = Typography

export const CustomText = styled(Text)`
  font-size: ${({ theme }) =>
    theme?.typography?.fontSize?.body2 ||
    typeformTheme?.typography?.fontSize?.body2};
`
export const CustomBox = styled(Box)`
  height: 150px;
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 32px;
`
