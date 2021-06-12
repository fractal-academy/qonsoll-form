import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'app/components'

function FormAdvancedView(props) {
  const {
    children,
    isAnswered,
    disabledUp,
    disabledDown,
    setIsAnswered,
    setCurrentSlide
  } = props

  return (
    <Carousel
      children={children}
      isAnswered={isAnswered}
      disabledUp={disabledUp}
      disabledDown={disabledDown}
      setIsAnswered={setIsAnswered}
      setCurrentSlide={setCurrentSlide}
    />
  )
}

FormAdvancedView.propTypes = {
  children: PropTypes.node,
  isAnswered: PropTypes.bool,
  setIsAnswered: PropTypes.func,
  setCurrentSlide: PropTypes.func
}

export default FormAdvancedView
