import './KeyBox.styles.css'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function KeyBox(props) {
  const { onButtonClick, item, isActive } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  // [COMPUTED PROPERTIES]
  const classes = isActive
    ? isHovering
      ? 'selectedHovered'
      : 'selected'
    : isHovering
    ? 'hovered'
    : 'buttonBox'

  return (
    <Box ref={hoverRef} mb={2}>
      <Button onClick={() => onButtonClick(letter)}>
        <Row display="flex" v="center" noGutters>
          <Col className={classes} mr={2}>
            {isHovering ? `Key ${letter}` : letter}
          </Col>
          <Col>
            <Box className="text" display="flex" justifyContent="space-between">
              {item?.choice?.name}
              {isActive && <CheckOutlined className="icon" />}
            </Box>
          </Col>
        </Row>
      </Button>
    </Box>
  )
}

KeyBox.propTypes = {
  onButtonClick: PropTypes.func,
  startLetter: PropTypes.string,
  item: PropTypes.object
}

export default KeyBox
