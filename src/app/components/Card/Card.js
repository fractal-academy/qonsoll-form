import './Card.styles.css'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'

function Card(props) {
  const { number, children } = props

  return (
    <Box position="relative">
      <Box className="hiddenBox"></Box>
      <Box className="contentBox">{children}</Box>
      <Box className="numberBox">{number}</Box>
    </Box>
  )
}

Card.propTypes = {
  number: PropTypes.number,
  children: PropTypes.node
}

export default Card
