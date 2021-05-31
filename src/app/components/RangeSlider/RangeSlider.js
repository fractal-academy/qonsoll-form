import { Slider } from 'antd'
import React, { useState } from 'react'
import { Box, Col, Container, Row } from '@qonsoll/react-design'
import { CustomInputNumber } from './RangeSlider.styles'

function RangeSlider(props) {
  // [COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(0)

  // [CLEAN FUNCTIONS]
  const onSlide = (value) => {
    setInputValue(value)
  }
  const value = typeof inputValue === 'number' ? inputValue : 0

  return (
    <Box display="flex" alignItems="center">
      <Slider
        min={-50}
        max={50}
        onChange={onSlide}
        value={value}
        style={{ flexGrow: 1, marginRight: '12px' }}
      />
      <CustomInputNumber
        min={-50}
        max={50}
        value={inputValue}
        onChange={onSlide}
      />
    </Box>
  )
}

export default RangeSlider
