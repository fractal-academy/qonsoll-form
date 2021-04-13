import { Button } from 'antd'
import PropTypes from 'prop-types'

const CustomButton = (props) => {
  const { buttonType, buttonText, layout = <></>, children } = props

  return (
    <Button
      style={
        buttonType === 'secondary' ? { height: '40px', width: '160px' } : {}
      }
      type={buttonType}>
      {layout}
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  buttonType: PropTypes.string.isRequired
}

export default CustomButton
