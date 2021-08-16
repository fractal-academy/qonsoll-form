import styled from 'styled-components'
import { Box, Col, Row } from '@qonsoll/react-design'
import typeformTheme from '../../../../../styles/theme'

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

export const WrapperRow = styled(Row)`
  ${({ theme }) => `
    height: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    display:flex;
    border-radius: 
        ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
    }
`}
`

export const StyledBox = styled(Box)`
  ${({ specialLayoutRule }) => `
  // display:grid;
  display:flex;
  flex-direction:column;
  
  width: 100%;
  background-color: transparent;
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
  background-image: ${({ image }) => image};
  filter: brightness(${({ imageBrightness }) => imageBrightness + 100}%);
  ${({ theme }) => `
border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
`}
`
