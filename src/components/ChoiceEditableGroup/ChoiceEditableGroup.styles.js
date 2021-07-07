import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from '../../../styles/theme'

export const styles = {
  mainBox: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}

export const AddNewChoiceBox = styled(Box)`
  ${({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center !important;
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  cursor: pointer;
  background-color:
    ${
      theme?.color?.primary?.t?.lighten6 ||
      typeformTheme?.color?.primary?.t?.lighten6
    };
  &:hover {
     background-color:
    ${
      theme?.color?.primary?.t?.lighten3 ||
      typeformTheme?.color?.primary?.t?.lighten3
    };
  }
`}
`
