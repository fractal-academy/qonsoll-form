import { Typography } from 'antd'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import theme from '../../../../../styles/theme'

const { Text } = Typography

export const CustomText = styled(Text)`
  font-size: ${theme.typography.fontSize.body2};
`
export const CustomBox = styled(Box)`
  height: 150px;
  border-radius: ${theme.borderRadius.md};
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
`
