import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { Input, Typography, Button } from 'antd'
import typeformTheme from '../../../../../styles/theme'

const { Text } = Typography

export const CustomText = styled(Text)`
  ${({ theme }) => `
  color: ${
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1
  };
`}
`
export const CustomInput = styled(Input)``
export const CustomButton = styled(Button)`
  ${({ theme }) => `
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1
  };
  border-color: ${
    theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
  };
  :hover {
    background-color: ${
      theme?.color?.dark?.t?.lighten2 || typeformTheme?.color?.dark?.t?.lighten2
    };
    border-color: ${
      theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
    };
  }
`}
`

export const MediaListContainer = styled(Box)(({ theme }) => ({
  height: '450px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  background:
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
}))
