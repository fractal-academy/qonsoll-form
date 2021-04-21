import { Button } from 'antd'
import PropTypes from 'prop-types'
import './CustomButton.styles.css'

function CustomButton(props) {
  const { buttonType, children, onClick, ...args } = props

  // [COMPUTED PROPERTIES]
  const styleMap = {
    primary: { style: 'primaryButton' },
    secondary: { style: 'secondaryButton' }
  }
  const style = styleMap[buttonType].style

  return (
    <Button
      className={style}
      onClick={onClick && onClick}
      type={buttonType}
      {...args}>
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  buttonType: PropTypes.string.isRequired
}

export default CustomButton
