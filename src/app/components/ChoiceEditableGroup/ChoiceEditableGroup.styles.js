import { globalStyles } from 'app/styles'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

export const styles = {
  mainBox: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}

export const AddNewChoiceBox = styled(Box)(({ theme }) => ({
  background:
    theme?.color?.primary?.lighten6 || typeformTheme?.color?.primary?.lighten6,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md,
  cursor: globalStyles?.cursorPointer
}))
