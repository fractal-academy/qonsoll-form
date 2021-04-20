import './KeyBox.styles.css'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { Button } from 'app/components'
import React, { useEffect } from 'react'
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

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Box ref={hoverRef}>
      <Button buttonType="secondary" onClick={() => onButtonClick(letter)}>
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
