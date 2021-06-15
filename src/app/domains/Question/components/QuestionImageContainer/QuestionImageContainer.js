import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'

const ImageContainer = styled(Box)(({ theme, image, imageBrightness }) => ({
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${image})`,
  backgroundPosition: 'center center',
  filter: `brightness(${imageBrightness + 100}%)`,
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
}))

export default ImageContainer
