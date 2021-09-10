import React from 'react'
import { Spin } from 'antd'
import { Box } from '@qonsoll/react-design'

function Spinner() {
  return (
    <Box position="absolute" top="50%" left="50%">
      <Spin size="large" />
    </Box>
    //
  )
}

export default Spinner
