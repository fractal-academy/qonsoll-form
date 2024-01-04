import styled from 'styled-components'

const IconRoundContainer = styled.div`
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
