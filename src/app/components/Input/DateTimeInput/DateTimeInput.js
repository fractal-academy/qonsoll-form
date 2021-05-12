import { DatePicker } from 'antd'

const DateTimeInput = (props) => {
  const { onClick } = props

  // [CLEAN FUNCTIONS]
  const onChange = (date) => {
    onClick && onClick()
  }

  return <DatePicker onPanelChange={onChange} {...props} />
}

export default DateTimeInput
