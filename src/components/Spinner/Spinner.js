import { Box } from '@qonsoll/react-design'
import React from 'react'
import { Spin } from 'antd'

function Spinner() {
  return (
    <Box
      top="50%"
      left="50%"
      position="absolute"
      transform="translate(-50%, -50%)">
      <Spin size="large" />
    </Box>
  )
}

export default Spinner
