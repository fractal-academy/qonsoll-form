import { Col, Row } from '@qonsoll/react-design'
import { Card } from 'antd'
import styled from 'styled-components'

export const styles = {
  questionCardColumnStyle: {
    order: 2,
    v: 'center',
    flexDirection: 'column'
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
  padding-left: 20px;
  width: 100%;
  background: transparent;
`
export const CustomRow = styled(Row)`
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  display: flex;
`
export const CustomCol = styled(Col)`
  order: 2;
  justify-content: center;
  flex-direction: column;
`
