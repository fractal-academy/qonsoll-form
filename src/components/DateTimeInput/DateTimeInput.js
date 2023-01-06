import React, { useRef } from 'react'

import PropTypes from 'prop-types'
import { StyledDatePicker } from './DateTimeInput.styles'
import { getQuestionAnswerFromContext } from '../../helpers'
import { message } from 'antd'
import { useAnswersContext } from '../../context/Answers'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

const DateTimeInput = (props) => {
  const { onDateChange, question, currentSlide } = props

  // [ADDITIONAL_HOOKS]
  const datePickerRef = useRef()
  const { t } = useTranslations()
  const answersContext = useAnswersContext()

  // [CLEAN FUNCTIONS]
  const onChange = (_, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
    datePickerRef.current.blur()
  }

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
          ? message.error(t('The answer is required'))
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
      placeholder={t('Select date')}
      {...props}
    />
  )
}
DateTimeInput.propTypes = {
  onDateChange: PropTypes.func,
  question: PropTypes.object,
  currentSlide: PropTypes.number
}
export default DateTimeInput
