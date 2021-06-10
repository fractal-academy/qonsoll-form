import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

const IconRoundContainer = styled(Box)`
  ${({ theme, danger }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${
    (danger && theme.color.danger.t.lighten) ||
    theme?.color?.dark?.t?.lighten6 ||
    typeformTheme?.color?.dark?.t?.lighten6
  };
  `}
`

export default IconRoundContainer
