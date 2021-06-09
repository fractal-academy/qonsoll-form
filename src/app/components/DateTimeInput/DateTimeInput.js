import React from 'react'
import { DatePicker } from 'antd'

const DateTimeInput = (props) => {
  const { onDateChange, question } = props

  // [CLEAN FUNCTIONS]
  const onChange = (date, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
  }

  return <DatePicker onChange={onChange} {...props} />
}

export default DateTimeInput
