import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import theme from '../../../../styles/theme'
import { Divider } from 'antd'
import { QuestionTypeSelect } from 'domains/Question/components'

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
  width: 300px;
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
