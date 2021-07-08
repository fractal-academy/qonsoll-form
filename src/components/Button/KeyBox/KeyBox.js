import React from 'react'
import { Button, Typography } from 'antd'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useHover } from '@umijs/hooks'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'
import useMedia from 'use-media'
import { DEFAULT_IMAGE } from '../../../constants'
import typeformTheme from '../../../../styles/theme'
import { blinkBackground } from '../../../animation'

const { Text } = Typography

const StyledKeybox = styled(Col)`
  position: absolute;
  bottom: 8px;
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme};
  color: ${({ isActive, theme }) =>
    isActive &&
    (theme?.color?.white?.default || typeformTheme?.color?.white?.default)};
  margin-left: ${({ isHovering, phoneSmall }) =>
    isHovering && phoneSmall ? '' : isHovering && '-40px'};
  background-color: ${({ isActive, theme }) =>
    isActive
      ? theme?.color?.primary?.default || typeformTheme?.color?.white?.default
      : theme?.color?.white?.default || typeformTheme?.color?.white?.default};
  width: ${({ isHovering, phoneSmall }) =>
    isHovering && !phoneSmall ? '65px !important' : '26px !important'};
`
const ImageContainer = styled(Box)`
  width: 100%;
  height: ${({ phoneSmall }) => (phoneSmall ? '200px' : '100px')};
  border-radius: 8px;
  margin-bottom: 8px;
  background-size: cover;
  background-image: url(${({ image }) => image});
`
const StyledButton = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  height: 100%;
  color: ${({ theme }) =>
    theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme?.color?.primary?.t?.lighten2 ||
        typeformTheme?.color?.primary?.t?.lighten2
      : theme?.color?.primary?.t?.lighten5 ||
        typeformTheme?.color?.primary?.t?.lighten5};
  &:hover {
    background-color: ${({ theme }) =>
      theme?.color?.primary?.t?.lighten3 ||
      typeformTheme?.color?.primary?.t?.lighten3};
  }
  ${blinkBackground}
  ${({ isActive }) =>
    isActive &&
    css`
      animation: blinkBackground 0.5s ease;
    `}
`
const StyledText = styled(Text)`
  width: ${({ hasImages, phoneSmall }) =>
    hasImages ? (phoneSmall ? '100%' : '15ch') : '100%'};
  padding-left: 30px;
`

// const StyledBadge = styled(Button)`
//   position: absolute;
//   border-radius: 50%;
//   height: 24px;
//   z-index: 100;
//   padding: 3px;
//   width: 24px;
//   right: 0;
//   top: -4px;
// `

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
      mr={2}
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
              mr={1}>
              {isHovering && !phoneSmall ? `Key ${letter}` : letter}
            </StyledKeybox>
            <StyledText hasImages={hasImages} phoneSmall={phoneSmall}>
              {item?.choice?.answerOption || `Choice ${index + 1}`}
            </StyledText>
          </Col>
          {/* <Col cw="auto">
            <Box position="absolute" top="0" right="0">
              {isActive && (
                // <StyledBadge size="small" type="primary">
                //   <CheckOutlined />
                // </StyledBadge>
              )}
            </Box>
          </Col> */}
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
