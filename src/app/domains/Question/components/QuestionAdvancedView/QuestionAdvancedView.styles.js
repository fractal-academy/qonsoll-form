import { Col } from '@qonsoll/react-design'
import { Card } from 'antd'
import styled from 'styled-components'

export const styles = {
  mainRowStyle: {
    noGutters: true,
    height: 'inherit',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  questionCardColumnStyle: {
    v: 'center',
    order: 2,
    mx: 4,
    display: 'flex'
  },
  sideImageColumnStyle: {
    v: 'center',
    display: 'flex',
    height: '100%'
  }
}

export const QuestionCard = styled(Card)`
  width: 400px;
`
export const StyledCol = styled(Col)`
  justify-content: center;
  align-items: 'center';
`
