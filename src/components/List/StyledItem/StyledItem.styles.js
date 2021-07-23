import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

export const Item = styled(Box)`
  ${({ theme }) => `
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 6px;
  cursor: pointer;
  background: ${
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9
  };
  width: -webkit-fill-available;
  height: fit-content;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${
      theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
    };
    border-color: ${
      theme?.color?.dark?.t?.lighten8 || typeformTheme?.color?.dark?.t?.lighten8
    };
  }
`}
`
