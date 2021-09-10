import React from 'react'
import PropTypes from 'prop-types'
import { StyledTextEditable } from './TextEditable.styles'

function TextEditable(props) {
  const { isTitle, textSecondary, ...rest } = props

  return (
    <StyledTextEditable
      {...rest}
      maxLength={700}
      bordered={false}
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
