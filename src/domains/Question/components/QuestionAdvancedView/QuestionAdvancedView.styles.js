import { Card } from 'antd'
import styled from 'styled-components'
import { Box, Col } from '@qonsoll/react-design'
import useMedia from 'use-media'

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
    backgroundRepeat: 'no-repeat'
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
