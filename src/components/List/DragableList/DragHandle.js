import { MoreOutlined } from '@ant-design/icons'
import React from 'react'
import { sortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

const FirstIcon = styled(MoreOutlined)`
  margin-right: -10px;
`
const SecondIcon = styled(MoreOutlined)`
  margin-right: -5px;
`
const HandlerBox = styled.div`
  cursor: grab;
  display: flex;
`

const DragHandler = sortableHandle(() => (
  <HandlerBox>
    <FirstIcon />
    <SecondIcon />
  </HandlerBox>
))

export default DragHandler
