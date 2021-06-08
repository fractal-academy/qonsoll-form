import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from '../../../../components'

const FormAdvancedView = (props) => <Carousel {...props} />

FormAdvancedView.propTypes = {
  children: PropTypes.node,
  isAnswered: PropTypes.bool,
  setIsAnswered: PropTypes.func,
  setCurrentSlide: PropTypes.func,
  submitLoading: PropTypes.bool
}

export default FormAdvancedView
