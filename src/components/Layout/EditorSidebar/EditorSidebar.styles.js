import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const SidebarBoxWrapper = styled(Box)`
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : 'var(--qf-sidebar-bg)'};
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  width: var(--qf-sidebar-width);
  min-width: 300px;
`
