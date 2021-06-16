import React from 'react'
import { Slider } from 'antd'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import { CustomInputNumber } from './RangeSlider.styles'

function RangeSlider(props) {
  const { onBlur, inputValue, setInputValue } = props

  // [CLEAN FUNCTIONS]
  const onSlide = (value) => {
    setInputValue(value)
  }
  const value = typeof inputValue === 'number' ? inputValue : 0

  return (
    <Box display="flex" alignItems="center">
      <Slider
        min={-100}
        max={100}
        onBlur={onBlur}
        onChange={onSlide}
        value={value}
        style={{ flexGrow: 1, marginRight: '12px' }}
      />
      <CustomInputNumber
        min={-100}
        max={100}
        value={inputValue}
        onChange={onSlide}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      />
    </Box>
  )
}

RangeSlider.propTypes = {
  inputValue: PropTypes.number,
  setInputValue: PropTypes.func
}

export default RangeSlider
