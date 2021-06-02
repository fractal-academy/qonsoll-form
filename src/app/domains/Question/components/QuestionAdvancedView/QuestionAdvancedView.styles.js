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
    borderRadius: `${theme.borderRadius.md}`,
    overflow: 'auto'
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
  display: grid;
  background-color: transparent;
  text-align: ${(props) => props.specialLayoutRule && 'center'};
  justify-content: ${(props) => props.specialLayoutRule && 'center'};
`
export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
