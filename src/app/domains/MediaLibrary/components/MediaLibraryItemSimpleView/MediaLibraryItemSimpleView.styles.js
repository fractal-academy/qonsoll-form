import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'
import { Card, Button, Image, Typography } from 'antd'

const { Text } = Typography

export const styles = {
  cardBodyStye: { padding: '0 8px 8px 8px' }
  // imageStyle: { borderRadius: '8px' }
}

export const CustomCard = styled(Card)`
  ${({ theme }) => `
  padding: 4px;
  background-color: ${
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  position: relative;
`}
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
  height: 136px;
  width: 208px;
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md} !important;
`
export const CustomText = styled(Text)`
  ${({ theme }) => `
  color: ${
    theme?.color?.text?.dark?.primary ||
    typeformTheme?.color?.text?.dark?.primary
  };
  font-size: ${
    theme?.typography?.fontSize?.body2 ||
    typeformTheme?.typography?.fontSize?.body2
  };
  font-weight: ${
    theme?.typography?.fontWeight?.bold ||
    typeformTheme?.typography?.fontWeight?.bold
  };
  max-width: 190px;
`}
`
