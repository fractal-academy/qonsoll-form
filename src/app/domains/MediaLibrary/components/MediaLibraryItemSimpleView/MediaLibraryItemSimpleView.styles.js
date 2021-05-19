import theme from 'app/styles/theme'
import { Card, Button, Image, Typography } from 'antd'
import styled from 'styled-components'
const { Text } = Typography

export const styles = {
  titleStyle: {
    color: theme.color.text.dark.primary,
    fontSize: theme.typography.fontSize.body2,
    fontWeight: theme.typography.fontWeight.bold,
    maxWidth: '190px'
  },

  cardBodyStye: { padding: '0 8px 8px 8px' }
  // imageStyle: { borderRadius: '8px' }
}
export const CustomCard = styled(Card)`
  padding: 4px;
  background-color: ${theme.color.dark.t.lighten9};
  border-radius: ${theme.borderRadius.md};
  position: relative;
`
export const CustomButton = styled(Button)`
  position: absolute;
  bottom: -4px;
  right: -4px;
  z-index: 100;
  border-radius: 50%;
  padding: 3px;
  width: 24px;
  height: 24px;
`
export const CustomImage = styled(Image)`
  border-radius: ${theme.borderRadius.md} !important;
`
export const CustomText = styled(Text)`
  color: ${theme.color.text.dark.primary};
  font-size: ${theme.typography.fontSize.body2};
  font-weight: ${theme.typography.fontWeight.bold};
  max-width: 190px;
`
