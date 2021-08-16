import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const SidebarBoxWrapper = styled(Box)`
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme?.color?.white?.default};
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 300px;
`
