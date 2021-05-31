import React from 'react'
import { DatePicker } from 'antd'

const DateTimeInput = (props) => {
  const { onDateChange, id } = props

  // [CLEAN FUNCTIONS]
  const onChange = (date, dateString) => {
    const data = { questionId: id, answer: dateString }
    !!dateString && onDateChange && onDateChange(data)
  }

  return <DatePicker onChange={onChange} {...props} />
}

export default DateTimeInput
