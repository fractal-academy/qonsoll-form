import './ImageKeyBox.styles.css'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function ImageKeyBox(props) {
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
    <Box display="inline-block" ref={hoverRef} mb={1} mr={1}>
      <Button className="imageButton" onClick={() => onButtonClick(letter)}>
        <Row h="center" display="flex">
          <Col
            cw="auto"
            display="flex"
            textAlign="center"
            style={{ justifyContent: 'center' }}>
            <img
              alt=""
              className="imageContainer"
              src={item?.choice?.image}></img>
          </Col>
        </Row>
        <Row display="flex" v="center" mt={2} noGutters>
          <Col cw="auto" className={classes} mr={2}>
            {isHovering ? `Key ${letter}` : letter}
          </Col>
          <Col cw="auto">
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

ImageKeyBox.propTypes = {
  onButtonClick: PropTypes.func,
  startLetter: PropTypes.string,
  item: PropTypes.object
}

export default ImageKeyBox
