import theme from '../../../../../styles/theme'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const styles = {
  addNewItemStyles: {
    bg: theme.color.dark.t.lighten9,
    mr: 3,
    mb: 3,
    borderRadius: theme.borderRadius.md,
    width: '245px',
    height: '214px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
export const StyledBox = styled(Box)`
  flex-direction: column;
  min-height: 100%;
  padding-left: ${({ mobileLayout }) => (mobileLayout ? '45px' : '20px')};
  padding-right: ${({ mobileLayout }) => (mobileLayout ? '45px' : '20px')};
  padding-top: 4px;
  padding-bottom: 4px;
`
