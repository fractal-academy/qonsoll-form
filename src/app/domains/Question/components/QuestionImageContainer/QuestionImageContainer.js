import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import typeformTheme from 'app/styles/theme'
import { LAYOUT_TYPES } from 'app/constants'
import css from 'styled-components'

const ImageContainer = styled(Box)`
  ${({ theme, image, layoutType }) => `
    background-size: cover;
    border-radius:
${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  ${console.log(layoutType)}


    background-repeat: no-repeat;
    background-image: url(${image});
    background-position: center center;
`}
`
export default ImageContainer
