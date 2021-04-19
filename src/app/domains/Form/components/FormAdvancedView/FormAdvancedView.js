import PropTypes from 'prop-types'
import { Carousel } from 'app/components'

function FormAdvancedView(props) {
  const { children } = props

  return <Carousel children={children} />
}

FormAdvancedView.propTypes = { children: PropTypes.node }

export default FormAdvancedView
