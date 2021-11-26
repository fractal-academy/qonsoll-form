import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { LAYOUT_TYPES } from '../../../../constants'

const ImageContainer = styled(Box)`
  ${({ image, layoutType, brightness }) => `
    filter: brightness(${brightness + 100}%);
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${image};
    background-position: center center;
    border-radius:
${
  layoutType === LAYOUT_TYPES.LEFT_SIDE_BIG.type
    ? 'var(--qf-border-radius-md) 0 0 var(--qf-border-radius-md)'
    : layoutType === LAYOUT_TYPES.RIGHT_SIDE_BIG.type
    ? '0 var(--qf-border-radius-md) var(--qf-border-radius-md) 0'
    : 'var(--qf-border-radius-md)'
};
`}
`
export default ImageContainer
