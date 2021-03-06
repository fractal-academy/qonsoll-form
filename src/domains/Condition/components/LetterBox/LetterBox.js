import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

const LetterBox = styled(Box)`
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--qf-border-radius-sm);
  border: 1px solid var(--qf-condition-item-border);
`

export default LetterBox
