import { DatePicker } from 'antd'

const DateTimeInput = (props) => {
  // [CLEAN FUNCTIONS]
  const onChange = (date) => {}

  return <DatePicker onChange={onChange} {...props} />
}

export default DateTimeInput
