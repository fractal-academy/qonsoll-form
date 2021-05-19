import { Card } from 'antd'
import styled from 'styled-components'

export const styles = {
  cardStyle: { width: '400px' },
  //?
  mainRowStyle: {
    noGutters: true,
    height: 'inherit',
    h: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  questionCardColumnStyle: {
    v: 'center',
    cw: 'auto',
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

export const StyledCard = styled(Card)`
  width: 400px;
`
