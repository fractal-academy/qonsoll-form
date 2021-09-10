import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import { LAYOUT_TYPES } from '../../../../constants'

const ImageContainer = styled(Box)`
  ${({ image, layoutType, widthTablet, imageBrightness }) => `
    filter: brightness(${imageBrightness + 100}%);
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${image});
    background-position: center center;
    border-radius: var(--qf-border-radius-md);
    border-top-right-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type && !widthTablet
    ? 0
    : 'var(--qf-border-radius-md)'
};

    border-bottom-right-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type && !widthTablet
    ? 0
    : 'var(--qf-border-radius-md)'
};
    
    border-top-left-radius:
${
  layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type && !widthTablet
    ? 0
    : 'var(--qf-border-radius-md)'
};
    
    border-bottom-left-radius:
${
  layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type && !widthTablet
    ? 0
    : 'var(--qf-border-radius-md)'
};
`}
`
export default ImageContainer
