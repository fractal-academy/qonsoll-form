import { Box, Col } from '@qonsoll/react-design'
import { Input } from 'antd'
import styled from 'styled-components'
import typeformTheme from '../../../styles/theme'

const { TextArea } = Input

export const MainBox = styled(Box)(({ theme, withImage }) => ({
  background:
    theme?.color?.primary?.lighten6 || typeformTheme?.color?.primary?.lighten6,
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md,
  width: withImage ? 'auto' : '100%',
  position: 'relative'
}))

export const MediaBox = styled(Box)(({ theme }) => ({
  height: '100px',
  width: '150px',
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md,
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

export const LetterBox = styled(Box)`
  ${({ theme }) => `
    position: absolute;
  top: 13px;
  width: 20px;
  border: 1px solid ${
    theme?.color?.primary?.t?.lighten2 ||
    typeformTheme?.color?.primary?.t?.lighten2
  };
  text-align: center;
  font-size: ${
    theme?.typography?.fontSize?.body2 ||
    typeformTheme?.typography?.fontSize?.body2
  };
  line-height: ${
    theme?.typography?.lineHeight?.body2 ||
    typeformTheme?.typography?.lineHeight?.body2
  };
  color: ${
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
  };
  background-color: ${
    theme?.color?.white?.default || typeformTheme?.color?.white?.default
  };
`}
`
export const DeleteButton = styled(Box)`
  ${({ theme }) => `
  position: absolute;
  right: -6px;
  top: -6px;
  cursor: pointer;
  background-color: ${
    theme?.color?.primary?.t?.lighten3 ||
    typeformTheme?.color?.primary?.t?.lighten3
  };
  font-size: ${
    theme?.typography?.fontSize?.caption2 ||
    typeformTheme?.typography?.fontSize?.caption2
  };
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`}
`
export const ChoiceInput = styled(TextArea)`
  padding-right: 0px;
  padding-left: ${({ withImage }) => (withImage ? '8px' : '15px')};
  cursor: initial;
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
`
export const CustomCol = styled(Col)`
  position: absolute;
  bottom: 8px;
`
export const ChoiceOptionCol = styled(Col)`
  padding-left: ${({ withImage }) => (withImage ? '0' : '15px')};
`
