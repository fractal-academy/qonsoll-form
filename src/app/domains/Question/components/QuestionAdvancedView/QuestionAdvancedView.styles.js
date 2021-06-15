import styled from 'styled-components'
import { Box, Col } from '@qonsoll/react-design'

export const styles = {
  questionCardColumnStyle: {
    v: 'center',
    order: 2,
    mx: 4
  },
  sideImageColumnStyle: {
    v: 'center',
    h: 'justifyContent',
    display: 'flex'
  },
  mainRowStyle: {
    h: 'center',
    height: 'inherit',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  }
}

export const StyledBox = styled(Box)`
  ${({ specialLayoutRule }) => `
  width: 100%;
  // height: 100%;
  display: grid;
  background-color: transparent;
  text-align: ${specialLayoutRule && 'center'};
  justify-content: ${specialLayoutRule && 'center'};
  max-height: 85vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`}
`

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const BackgroundImage = styled(Col)`
  height: inherit;
  z-index: -100;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => props.image};
  filter: brightness(${(props) => props.imageBrightness + 100}%);
`
