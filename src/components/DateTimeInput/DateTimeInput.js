import { message } from 'antd'
import React, { useRef } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { TEXTINGS } from '../../constants'
import { StyledDatePicker } from './DateTimeInput.styles'
import { useAnswersContext } from '../../context/Answers'
import { useTranslation } from '../../context/Translation'
import { getQuestionAnswerFromContext } from '../../helpers'

const DateTimeInput = (props) => {
  const { onDateChange, question, currentSlide } = props

  // [CLEAN FUNCTIONS]
  const onChange = (_, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
    datePickerRef.current.blur()
  }
  //[CUSTOM HOOKS]
  const { requiredAnswerMessage, datepickerPlaceholder } = useTranslation()
  const answersContext = useAnswersContext()

  // [ADDITIONAL_HOOKS]
  const datePickerRef = useRef()

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        const questionAnswer = getQuestionAnswerFromContext(
          answersContext,
          question
        )
        const answerData = questionAnswer || {
          question,
          answer: { value: '' }
        }

        question?.isRequired && !questionAnswer
          ? message.error(
              requiredAnswerMessage || TEXTINGS.requiredAnswerMessage
            )
          : onDateChange?.(answerData)
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <StyledDatePicker
      ref={datePickerRef}
      onChange={onChange}
      disabled={!onDateChange}
      placeholder={datepickerPlaceholder || TEXTINGS.datepickerPlaceholder}
      {...props}
    />
  )
}

export default DateTimeInput
