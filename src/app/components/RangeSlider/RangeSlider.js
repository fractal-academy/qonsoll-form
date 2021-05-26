import { Slider } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from '@qonsoll/react-design'
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
    <Row noGutters>
      <Col>
        <Slider min={-50} max={50} onChange={onSlide} value={value} />
      </Col>
      <Col cw="auto">
        <CustomInputNumber
          min={-50}
          max={50}
          value={inputValue}
          onChange={onSlide}
        />
      </Col>
    </Row>
  )
}

export default RangeSlider
