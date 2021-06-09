import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'

const ImageContainer = styled(Box)(({ theme, image }) => ({
  backgroundSize: 'cover',
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md,
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${image})`,
  backgroundPosition: 'center center'
}))

export default ImageContainer
