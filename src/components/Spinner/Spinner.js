import React from 'react'
import { Spin } from 'antd'

function Spinner() {
  return (
    <div
      top="50%"
      left="50%"
      position="absolute"
      transform="translate(-50%, -50%)"
    >
      <Spin size="large" />
    </div>
  )
}

export default Spinner
