import React, { useRef, useState } from 'react'
import { DatePicker, message } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'
import typeformTheme from '../../../styles/theme'
import styled from 'styled-components'
import moment from 'moment'

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

  const [datePickerValue, setDatePickerValue] = useState()

  // [CLEAN FUNCTIONS]
  const onChange = (date, dateString) => {
    setDatePickerValue(date)
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
    datePickerRef.current.blur()
  }
  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()

  // [ADDITIONAL_HOOKS]
  const datePickerRef = useRef()

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        const dateFromPicker = datePickerValue
          ? moment(datePickerValue).format('YYYY-MM-DD')
          : ''
        const answerData = {
          question,
          answer: { value: dateFromPicker }
        }

        if (question?.isRequired && !dateFromPicker) {
          message.error(
            answerRequiredMessageError ||
              'It`s required question, please answer'
          )
        } else {
          onDateChange?.(answerData)
        }
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <StyledDatePicker
      value={datePickerValue}
      ref={datePickerRef}
      onChange={onChange}
      disabled={!onDateChange}
      {...props}
    />
  )
}

export default DateTimeInput
