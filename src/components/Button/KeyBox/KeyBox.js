import { Box, Col, Row } from '@qonsoll/react-design'
import {
  ImageContainer,
  StyledButton,
  StyledKeybox,
  StyledText
} from './KeyBox.styles'

import { DEFAULT_IMAGE } from '../../../constants'
import PropTypes from 'prop-types'
import React from 'react'
import { useHover } from '@umijs/hooks'

function KeyBox(props) {
  const { onButtonClick, item, index, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()
  const phoneSmall = window.innerWidth <= 500

  return (
    <Box
      ref={hoverRef}
      display={hasImages && 'inline-block'}
      mr={phoneSmall ? 0 : 2}
      width="100%">
      <StyledButton
        hasImages={hasImages}
        onTouchStart={() => onButtonClick(item)}
        onClick={() => onButtonClick(item)}
        isActive={isActive}>
        {hasImages && (
          <ImageContainer
            phoneSmall={phoneSmall}
            image={item?.choice?.image || DEFAULT_IMAGE}
          />
        )}
        <Row v="center" h="between" noGutters position="relative">
          <Col cw="12" v="center">
            <StyledKeybox
              isHovering={isHovering}
              phoneSmall={phoneSmall}
              isActive={isActive}
              hasImages={hasImages}>
              {isHovering && !phoneSmall ? `Key ${letter}` : letter}
            </StyledKeybox>
            <StyledText
              ml={1}
              isActive={isActive}
              hasImages={hasImages}
              phoneSmall={phoneSmall}>
              {item?.choice?.answerOption || `Choice ${index + 1}`}
            </StyledText>
          </Col>
        </Row>
      </StyledButton>
    </Box>
  )
}

KeyBox.propTypes = {
  item: PropTypes.object,
  hasImages: PropTypes.bool,
  onButtonClick: PropTypes.func,
  index: PropTypes.number,
  isActive: PropTypes.bool
}

export default KeyBox
