import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

const IconRoundContainer = styled(Box).attrs(() => ({
  display: 'flex'
}))`
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.dark.t.lighten6};
`

export default IconRoundContainer
