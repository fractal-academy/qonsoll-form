import styled from 'styled-components'
import { Typography, Button } from 'antd'
import typeformTheme from '../../../../../styles/theme'

const { Text } = Typography

export const CustomText = styled(Text)`
  ${({ theme }) => `
  color: ${
    theme?.color?.text?.dark?.secondary ||
    typeformTheme?.color?.text?.dark?.secondary
  };
  font-weight: ${
    theme?.typography?.fontWeight?.bold ||
    typeformTheme?.typography?.fontWeight?.bold
  };
  font-size: ${
    theme?.typography?.fontSize?.caption1 ||
    typeformTheme?.typography?.fontSize?.caption1
  };
  margin-bottom: 28px;
`}
`
export const CustomApplyButton = styled(Button)`
  width: 100%;
`
