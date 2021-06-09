import { Card } from 'antd'
import styled from 'styled-components'
import { Col } from '@qonsoll/react-design'

export const styles = {
  questionCardColumnStyle: {
    v: 'center',
    order: 2,
    mx: 4
  },
  sideImageColumnStyle: {
    v: 'center',
    display: 'flex',
    height: '100%'
  },
  mainRowStyle: {
    h: 'center',
    height: 'inherit',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
}

export const StyledCard = styled(Card)`
  ${({ specialLayoutRule }) => `
  width: 100%;
  padding-left: 8px;
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
