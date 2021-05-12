import PropTypes from 'prop-types'
import { TextEditable } from 'components'
import React, { useEffect, useState } from 'react'
import {
  useCurrentQuestionContextDispatch,
  useCurrentQuestionContext,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'

function QuestionSubtitle(props) {
  const { placeholder } = props

  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [textValue, setTextValue] = useState(currentQuestion?.subtitle || '')

  // [CLEAN FUNCTIONS]
  const onBlur = async () => {
    if (currentQuestion?.subtitle === textValue) return
    const subtitle = textValue || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ...currentQuestion, subtitle }
    })
  }
  const onChange = ({ target }) => {
    setTextValue(target.value)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    setTextValue(currentQuestion?.subtitle || '')
  }, [currentQuestion])

  return (
    <TextEditable
      textSecondary
      value={textValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  )
}

QuestionSubtitle.propTypes = {
  placeholder: PropTypes.string
}

export default QuestionSubtitle
