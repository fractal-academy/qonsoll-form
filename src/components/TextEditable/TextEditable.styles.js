import { TextArea } from '@qonsoll/react-design'
import styled from 'styled-components'

export const StyledTextEditable = styled(TextArea)`
  color: ${({ textSecondary }) =>
    textSecondary && 'var(--qf-typography-subtitle-color)'};

  ${({ isTitle }) =>
    isTitle &&
    `
    font-weight: 600;
    font-size: var(--qf-question-header-font-size);
    line-height: var(--qf-question-header-line-height);`}

  .ant-input {
    border: none !important;
    height: auto !important;
    background: transparent !important;
  }
`
