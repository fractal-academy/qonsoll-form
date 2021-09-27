import React from 'react'
import useMedia from 'use-media'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { DEFAULT_IMAGE } from '../../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  StyledButton,
  ImageContainer,
  StyledKeybox,
  StyledText
} from './KeyBox.styles'

function KeyBox(props) {
  const { onButtonClick, item, index, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()
  const phoneSmall = useMedia({ maxWidth: '500px' })

  return (
    <Box
      ref={hoverRef}
      display={hasImages && 'inline-block'}
      mb={2}
      mr={phoneSmall ? 0 : 2}
      width="100%">
      <StyledButton
        hasImages={hasImages}
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
              hasImages={hasImages}
              mr={1}>
              {isHovering && !phoneSmall ? `Key ${letter}` : letter}
            </StyledKeybox>
            <StyledText
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
  onButtonClick: PropTypes.func
}

export default KeyBox
