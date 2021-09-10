import styled from 'styled-components'
import { Box, Col } from '@qonsoll/react-design'

export const styles = {
  mainRowStyle: {
    h: 'center',
    height: 'inherit',
    position: 'relative'
  }
}

export const StyledBox = styled(Box)`
  ${({ specialLayoutRule }) => `
  display:flex;
  flex-direction:column;  
  text-align: ${specialLayoutRule && 'center'};
  justify-content: ${specialLayoutRule && 'center'};
  align-items: ${specialLayoutRule && 'center'};
  max-height: 80vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`}
`

export const BackgroundImage = styled(Col)`
  height: inherit;
  z-index: -100;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${({ image }) => image};
  filter: brightness(${({ imageBrightness }) => imageBrightness + 100}%);
  border-radius: var(--qf-border-radius-md);
`
