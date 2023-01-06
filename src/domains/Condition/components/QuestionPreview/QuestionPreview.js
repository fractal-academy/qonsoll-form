import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'

const QuestionPreview = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: var(--input-padding-vertical-base)
    var(--input-padding-horizontal-base);
  background: var(--input-bg);
  border-radius: var(--input-border-radius-base);
  border: var(--ql-border-width-default) var(--ql-border-style-default)
    var(--input-border-color);
`

export default QuestionPreview
