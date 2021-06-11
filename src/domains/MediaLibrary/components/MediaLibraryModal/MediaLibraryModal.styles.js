import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'
import { Input, Typography, Button, Divider } from 'antd'

const { Text } = Typography

export const styles = {
  modalBodyStyle: {
    height: '768px',
    padding: 0,
    zIndex: 10000
    // display: 'flex',
    // flexDirection: 'row'
  },
  addButton: {
    cursor: 'pointer'
  }
}
export const CustomBox = styled(Box)`
  ${({ theme }) => `
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  display: flex;
  padding: 6px 16px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ switchState }) =>
    switchState
      ? theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
      : theme?.color?.text?.dark?.secondary ||
        typeformTheme?.color?.text?.dark?.secondary};
  background-color: ${({ switchState }) =>
    switchState
      ? `${
          theme?.color?.white?.default || typeformTheme?.color?.white?.default
        }`
      : 'none'};
`}
`

export const CustomText = styled(Text)`
  ${({ theme }) => `
  color: ${
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1
  };
`}
`
export const CustomInput = styled(Input)`
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
`
export const CustomButton = styled(Button)`
  ${({ theme }) => `
  width: 129px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1
  };
  border-color: ${
    theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
  };
  border-radius: 8px;
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
export const CustomDivider = styled(Divider)`
  height: 100%;
  padding: 0;
`
export const CustomChangeButtonText = styled(Text)`
  ${({ theme }) => `
  font-size: ${
    theme?.typography?.fontSize?.body1 ||
    typeformTheme?.typography?.fontSize?.body1
  };
  font-weight: ${
    theme?.typography?.fontWeight?.bold ||
    typeformTheme?.typography?.fontWeight?.bold
  };
  color: ${
    theme?.color?.white?.default || typeformTheme?.color?.white?.default
  };
`}
`
export const MediaListContainer = styled(Box)(({ theme }) => ({
  height: '500px',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  background:
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
}))
