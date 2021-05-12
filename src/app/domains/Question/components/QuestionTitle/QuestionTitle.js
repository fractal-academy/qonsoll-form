import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextEditable } from 'components'
import {
  useCurrentQuestionContextDispatch,
  useCurrentQuestionContext,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'

function QuestionTitle(props) {
  const { placeholder } = props

  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const currentQuestion = useCurrentQuestionContext()

  // [COMPONENT STATE HOOKS]
  const [textValue, setTextValue] = useState()

  // [CLEAN FUNCTIONS]
  const onBlur = async () => {
    if (currentQuestion?.title === textValue) return
    const title = textValue || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { title }
    })
  }
  const onChange = ({ target }) => {
    setTextValue(target.value)
  }

  return (
    <TextEditable
      isTitle
      onBlur={onBlur}
      value={textValue}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}

QuestionTitle.propTypes = {
  placeholder: PropTypes.string
}

export default QuestionTitle
