import { Input } from '@qonsoll/react-design'
import styled from 'styled-components'

const { TextArea } = Input

export const StyledTextEditable = styled(TextArea)`
  padding-left: 0;
  font-weight: ${({ isTitle }) => isTitle && 'bold'};
  color: ${({ textSecondary }) =>
    textSecondary && 'var(--qf-typography-subtitle-color)'};
  font-size: ${({ isTitle }) =>
    isTitle && 'var(--qf-question-header-font-size)'};
  line-height: ${({ isTitle }) =>
    isTitle && 'var(--qf-question-header-line-height)'};
`
