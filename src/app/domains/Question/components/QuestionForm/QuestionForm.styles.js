import { Col } from '@qonsoll/react-design'
import { Card } from 'antd'
import styled from 'styled-components'

export const styles = {
  mainRowStyle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    h: 'center',
    height: '100%'
  },
  questionCardColumnStyle: {
    order: 2,
    v: 'center'
  },
  imageBetweenStyle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    mb: 3
  },
  sideImageColumnStyle: {
    height: '100%',
    v: 'center'
  },
  sideImageBoxStyle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    m: 2,
    position: 'relative'
  }
}

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const CustomCard = styled(Card)`
  width: 100%;
  background: transparent;
`
