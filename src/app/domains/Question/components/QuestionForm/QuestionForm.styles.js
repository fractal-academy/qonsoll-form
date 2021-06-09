import { Col, Row } from '@qonsoll/react-design'
import { Card } from 'antd'
import styled from 'styled-components'

export const styles = {
  questionCardColumnStyle: {
    order: 2,
    v: 'center',
    flexDirection: 'column'
  },
  sideImageColumnStyle: {
    height: '100%',
    v: 'center'
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
  max-height: 70vh;
  overflow-y: auto;
  background: transparent;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const CustomRow = styled(Row)`
  filter: brightness(${(props) => props.brightnessValue}%);
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  display: flex;
`
export const QuestionHeaderCol = styled(Col)``
