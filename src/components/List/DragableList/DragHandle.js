import React from 'react'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { MoreOutlined } from '@ant-design/icons'
import { sortableHandle } from 'react-sortable-hoc'

const FirstIcon = styled(MoreOutlined)`
  margin-right: -10px;
`
const SecondIcon = styled(MoreOutlined)`
  margin-right: -5px;
`
const HandlerBox = styled(Box)`
  cursor: grab;
`

const DragHandler = sortableHandle(() => (
  <HandlerBox>
    <FirstIcon />
    <SecondIcon />
  </HandlerBox>
))

export default DragHandler
