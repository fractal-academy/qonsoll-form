import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'
import { PhoneInput } from 'antd-styled'

const Input = (props) => {
  const { phone } = props

  return (
    <>
      {phone ? (
        <PhoneInput country={'no'} {...props} />
      ) : (
        <AntInput {...props} />
      )}
    </>
  )
}

Input.propTypes = {
  phone: PropTypes.bool
}

export default Input
