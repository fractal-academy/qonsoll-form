import { Card } from 'antd'
import styled from 'styled-components'
import { Col } from '@qonsoll/react-design'
import theme from 'app/styles/theme'

export const styles = {
  mainRowStyle: {
    height: 'inherit',
    h: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: `${theme.borderRadius.md}`
  },
  questionCardColumnStyle: {
    v: 'center',
    order: 2,
    mx: 4
  },
  sideImageColumnStyle: {
    v: 'center',
    display: 'flex',
    height: '100%'
  }
}

export const StyledCard = styled(Card)`
  width: 100%;
  padding-left: 8px;
  display: grid;
  background-color: transparent;
  text-align: ${(props) => props.specialLayoutRule && 'center'};
  justify-content: ${(props) => props.specialLayoutRule && 'center'};
  max-height: 85vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
