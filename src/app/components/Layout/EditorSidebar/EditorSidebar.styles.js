import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import theme from 'app/styles/theme'

export const styles = {
  sidebarBoxWrapper: {
    bg: theme.color.white.default,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },

  dragbleCeiling: {
    height: '3px',
    width: '50px',
    borderRadius: theme.borderRadius.md,
    bg: theme.color.dark.t.lighten1
  },
  endingsList: {
    pb: 3,
    px: 3,
    maxHeight: '350px',
    overflow: 'auto'
  }
}
export const SidebarStateSwitcher = styled(Box)`
  left: -20px;
  cursor: pointer;
  position: absolute;
  padding-right: 5px;
  background-color: ${theme.color.white.default};
  border-radius: 0 0 0 ${theme.borderRadius.md};
`
