import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../styles/theme'

export const HiddenBox = styled(Box)`
  position: absolute;
  top: 20px;
  width: 4px;
  height: 32px;
  z-index: 600;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${({ theme }) =>
    theme?.color?.dark?.lighten1 || typeformTheme?.color?.dark?.lighten1};
`
export const ContentBox = styled(Box)`
  ${({ theme, current }) => `
  position: inherit;
  z-index: 400;
  left: 4px;
  cursor: pointer;
  padding: 16px;
  border-radius: 16px;
  background-color: ${
    (current &&
      (theme?.color?.primary?.t?.lighten6 ||
        typeformTheme?.color?.primary?.t?.lighten6)) ||
    theme?.color?.dark?.t?.lighten9 ||
    typeformTheme?.color?.dark?.t?.lighten9
  };
  &:hover {
    background-color: ${
      (current &&
        (theme?.color?.primary?.t?.lighten4 ||
          typeformTheme?.color?.primary?.t?.lighten4)) ||
      theme?.color?.dark?.t?.lighten8 ||
      typeformTheme?.color?.primary?.t?.lighten8
    };
    transition: background-color 0.3s;
  }
`}
`
export const NumberBox = styled(Box)`
  ${({ theme }) => `
  position: absolute;
  top: 25px;
  width: 24px;
  height: 22px;
  z-index: 600;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
  color: ${
    theme?.color?.white?.t?.lighten1 || typeformTheme?.color?.white?.t?.lighten1
  };
  background-color: ${
    theme?.color?.dark?.lighten1 || typeformTheme?.color?.dark?.lighten1
  };
`}
`
