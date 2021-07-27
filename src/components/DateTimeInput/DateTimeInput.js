import React, { useRef } from 'react'
import { DatePicker, message } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'
import typeformTheme from '../../../styles/theme'
import styled from 'styled-components'
import { getQuestionAnswerFromContext } from '../../helpers'
import { useAnswersContext } from '../../context/Answers'

const StyledDatePicker = styled(DatePicker)`
  background-color: ${({ theme }) =>
    theme?.color?.dark?.t?.lighten7 || typeformTheme?.color?.dark?.t?.lighten7};

  .ant-picker-clear {
    border-radius: 50%;
    font-size: 18px;
  }
`

const DateTimeInput = (props) => {
  const { onDateChange, question, currentSlide } = props

  // [CLEAN FUNCTIONS]
  const onChange = (_, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
    datePickerRef.current.blur()
  }
  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
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
              answerRequiredMessageError ||
                'It`s required question, please answer'
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
      {...props}
    />
  )
}

export default DateTimeInput
