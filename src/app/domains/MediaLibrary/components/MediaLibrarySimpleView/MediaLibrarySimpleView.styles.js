import styled from 'styled-components'
import theme from 'app/styles/theme'
import { Typography } from 'antd'
const { Text } = Typography

export const CustomText = styled(Text)`
  font-size: ${theme.typography.fontSize.body2};
`
export const styles = {
  CustomBox: {
    height: '150px',
    borderRadius: `${theme.borderRadius.md}`,
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
}
