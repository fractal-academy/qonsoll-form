import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'

export const FormShowHeader = styled(Box)`
  background-color: ${({ theme }) =>
    theme.color.white.default || typeformTheme.color.white.default};
`
