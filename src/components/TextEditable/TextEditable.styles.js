import styled from 'styled-components'
import { Input } from '@qonsoll/react-design'

const { TextArea } = Input

export const StyledTextEditable = styled(TextArea)`
  padding-left: 0;
  font-weight: bold;
  color: ${({ textSecondary }) =>
    textSecondary && 'var(--qf-font-color-secondary)'};
  font-size: ${({ isTitle }) => isTitle && 'var(--qf-font-size-h3)'};
`
