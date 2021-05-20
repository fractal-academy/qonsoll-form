import { Card } from 'antd'
import styled from 'styled-components'
import { Col } from '@qonsoll/react-design'

export const styles = {
  mainRowStyle: {
    height: 'inherit',
    h: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
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
  background-color: transparent;
`
export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
