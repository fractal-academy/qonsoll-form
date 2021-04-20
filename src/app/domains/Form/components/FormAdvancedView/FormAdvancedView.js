import PropTypes from 'prop-types'
import { Carousel } from 'app/components'

function FormAdvancedView(props) {
  const { children, isAnswered, setIsAnswered } = props

  return (
    <Carousel
      children={children}
      isAnswered={isAnswered}
      setIsAnswered={setIsAnswered}
    />
  )
}

FormAdvancedView.propTypes = { children: PropTypes.node }

export default FormAdvancedView
