import { Card, Tag } from 'antd'
import styled from 'styled-components'
import { Col, Row } from '@qonsoll/react-design'

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

export const StyledTag = styled(Tag)`
  background-color: var(--qf-button-bg);
  color: var(--qf-tag-color);
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
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  display: flex;
`
export const StyledCol = styled(Col)`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
