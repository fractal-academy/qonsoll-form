import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

const IconRoundContainer = styled(Box)`
  ${({ danger }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${
    (danger && 'var(--qf-question-type-icon-danger)') ||
    'var(--qf-question-type-icon-default)'
  };
  `}
`

export default IconRoundContainer
