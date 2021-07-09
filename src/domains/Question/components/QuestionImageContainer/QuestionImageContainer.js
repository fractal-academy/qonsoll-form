import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import { LAYOUT_TYPES } from '../../../../constants'
import typeformTheme from '../../../../../styles/theme'

const ImageContainer = styled(Box)`
  ${({ theme, image, layoutType, heightSmallDevices, imageBrightness }) => `
    background-size: cover;
    filter: brightness(${imageBrightness + 100}%);
    background-repeat: no-repeat;
    background-image: url(${image});
    background-position: center center;
    
    border-radius:
${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
    
    border-top-right-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type && !heightSmallDevices
    ? 0
    : theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
};
    
    border-bottom-right-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type && !heightSmallDevices
    ? 0
    : theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
};
    
    border-top-left-radius:
${
  layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type && !heightSmallDevices
    ? 0
    : theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
};
    
    border-bottom-left-radius:
${
  layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type && !heightSmallDevices
    ? 0
    : theme?.borderRadius?.md || typeformTheme?.borderRadius?.md
};

`}
`
export default ImageContainer
