import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from '../../../../components'

function FormAdvancedView(props) {
  const { children, isAnswered, setIsAnswered, setCurrentSlide } = props

  return (
    <Carousel
      children={children}
      isAnswered={isAnswered}
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
