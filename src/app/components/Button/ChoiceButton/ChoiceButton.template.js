// import './Button.styles.css'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Box } from '@qonsoll/react-design'

const ChoiceButton = (props) => {
  const { conditions, buttonText = 'Button' } = props

  return <Box></Box>
}

ChoiceButton.propTypes = {
  conditions: PropTypes.array,
  buttonText: PropTypes.string
}

export default ChoiceButton
