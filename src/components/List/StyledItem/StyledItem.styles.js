import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from '../../../../styles/theme'

export const Item = styled(Box)`
  height: 100%;
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 6px;
  cursor: pointer;
  background: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten9 || 'var(--typeform-card-bg)'};
  width: -webkit-fill-available;
  display: flex;
  flex: 1;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten8 || 'var(--typeform-card-hover-bg)'};
    border-color: ${({ theme }) =>
      theme?.color?.dark?.t?.lighten8 ||
      typeformTheme?.color?.dark?.t?.lighten8};
  }
`
