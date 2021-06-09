import styled from 'styled-components'
import { Col } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

export const styles = {
  contentRow: {
    display: 'flex',
    m: 4,
    height: '100%'
  },
  footerButtons: {
    h: 'right',
    mb: 4,
    mx: 4
  }
}

export const ContentCol = styled(Col)(({ theme }) => ({
  backgroundColor:
    theme?.color?.white?.default || typeformTheme?.color?.white?.default,
  borderRadius: `${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md}`,
  flex: 1
}))
