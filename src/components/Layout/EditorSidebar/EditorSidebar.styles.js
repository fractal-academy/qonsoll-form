import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import { Divider } from 'antd'
import theme from '../../../../styles/theme'

export const styles = {
  dragbleCeiling: {
    height: '3px',
    width: '50px',
    borderRadius: theme.borderRadius.md,
    bg: theme.color.dark.t.lighten1
  },
  endingsList: {
    pb: 3,
    pr: 3,
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
export const SidebarBoxWrapper = styled(Box)`
  background-color: ${theme.color.white.default};
  //REMOVE OR REPLACE THIS CODE BY MORE RELATIVE
  width: fit-content;
  overflow-x: hidden;
  //REMOVE OR REPLACE THIS CODE BY MORE RELATIVE
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const dragbleCeiling = styled(Box)`
  background-color: ${theme.color.dark.t.lighten1};
  height: 3px;
  width: 50px;
  border-radius: ${theme.borderRadius.md};
`

export const CustomDivider = styled(Divider)`
  margin: 0;
`
export const EndingsList = styled(Box)`
  margin: 0;
`
