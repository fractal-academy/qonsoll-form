import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'

export const styles = {
  mainBox: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}

export const NewButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.primary.t.lighten6,
  borderRadius: theme.borderRadius.md
}))
