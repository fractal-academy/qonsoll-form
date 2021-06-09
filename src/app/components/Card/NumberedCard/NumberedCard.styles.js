import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

export const HiddenBox = styled(Box)`
  position: absolute;
  top: 20px;
  width: 4px;
  height: 32px;
  z-index: 600;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1};
`
export const ContentBox = styled(Box)`
  ${({ theme }) => `
  position: inherit;
  z-index: 400;
  left: 4px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
  };
  &:hover {
    background-color: ${
      theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
    };
    transition: background-color 1s;
  }
`}
`
export const NumberBox = styled(Box)`
  ${({ theme }) => `
  position: absolute;
  padding-right: 4px;
  top: 25px;
  left: 4px;
  width: 20px;
  height: 22px;
  z-index: 600;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
  color: ${
    theme?.color?.white?.t?.lighten1 || typeformTheme?.color?.white?.t?.lighten1
  };
  background-color: ${
    theme?.color?.dark?.t?.lighten1 || typeformTheme?.color?.dark?.t?.lighten1
  };
`}
`
