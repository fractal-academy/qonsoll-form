import PropTypes from 'prop-types'
import React from 'react'
import { StyledTextEditable } from './TextEditable.styles'

function TextEditable(props) {
  const { isTitle, textSecondary, ...rest } = props

  return (
    <StyledTextEditable
      {...rest}
      mb='24px'
      maxLength={250}
      isTitle={isTitle}
      autoSize={{ minRows: 1 }}
      textSecondary={textSecondary}
    />
  )
}

TextEditable.propTypes = {
  isTitle: PropTypes.bool,
  textSecondary: PropTypes.bool
}

export default TextEditable
