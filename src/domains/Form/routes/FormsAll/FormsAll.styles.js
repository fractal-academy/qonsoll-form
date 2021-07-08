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
  },
  mainWrapper: {
    // flexDirection: 'column',
    // px: 45,
    // py: 4,
    // minHeight: '100%'
  }
}
export const StyledBox = styled(Box)`
  flex-direction: column;
  min-height: 100%;
  padding-left: ${({ mobileLayout }) => (mobileLayout ? '45px' : '20px')};
  padding-right: ${({ mobileLayout }) => (mobileLayout ? '45px' : '20px')};
  padding-top: 4px;
  padding-bottom: 4px;
  //width: ${({ phoneSmall }) => (phoneSmall ? '100%' : '15ch')};
  //padding-left: ${({ hasImages }) => (hasImages ? '0' : '30px')};
  //word-break: break-word;
`
