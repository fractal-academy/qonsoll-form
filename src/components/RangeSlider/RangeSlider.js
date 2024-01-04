import PropTypes from 'prop-types'
import React from 'react'
import { Slider } from 'antd'

function RangeSlider(props) {
  const { onBlur, inputValue, setInputValue } = props

  // [CLEAN FUNCTIONS]
  const onSlide = (value) => {
    setInputValue(value)
  }
  const value = typeof inputValue === 'number' ? inputValue : 0

  return (
    <div display="flex" alignItems="center">
      <Slider
        min={-100}
        max={100}
        onBlur={onBlur}
        onChange={onSlide}
        value={value}
        style={{ flexGrow: 1 }}
      />
      {/* <CustomInputNumber
        min={-100}
        max={100}
        value={inputValue}
        onChange={onSlide}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      /> */}
    </div>
  )
}

RangeSlider.propTypes = {
  onBlur: PropTypes.func,
  inputValue: PropTypes.number,
  setInputValue: PropTypes.func
}

export default RangeSlider
