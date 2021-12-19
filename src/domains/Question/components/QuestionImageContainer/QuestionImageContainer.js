import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import { LAYOUT_TYPES } from '../../../../constants'

const ImageContainer = styled(Box)`
  ${({ image, layoutType, tabletSupport, brightness }) => `
    filter: brightness(${brightness + 100}%);
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${image};
    background-position: center center;
    border-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type && !tabletSupport
    ? 'var(--qf-border-radius-md) 0 0 var(--qf-border-radius-md)'
    : layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type && !tabletSupport
    ? '0 var(--qf-border-radius-md) var(--qf-border-radius-md) 0'
    : 'var(--qf-border-radius-md)'
};
`}
`
export default ImageContainer
