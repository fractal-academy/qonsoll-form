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

const DragHandler = sortableHandle(() => (
  <Box>
    <FirstIcon />
    <SecondIcon />
  </Box>
))

export default DragHandler
