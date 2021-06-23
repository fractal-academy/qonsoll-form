import typeformTheme from '../../../../../../styles/theme'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

export const CustomOpinionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor:
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9,
  border: '1px solid',
  borderColor:
    theme?.color?.dark?.t?.lighten5 || typeformTheme?.borderRadius?.md,
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
}))

export const CustomTextBox = styled(Box)(({ theme }) => ({
  minWidth: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid',
  borderColor:
    theme?.color?.dark?.t?.lighten4 || typeformTheme?.borderRadius?.md,
  borderRadius: theme?.borderRadius?.sm || typeformTheme?.borderRadius?.md
}))
