import React from 'react'
import { Button, Typography } from 'antd'
import PropTypes from 'prop-types'
import theme from '../../../../styles/theme'
import styled from 'styled-components'
import { useHover } from '@umijs/hooks'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'
import { useTranslation } from '../../../context/Translation'

const { Text } = Typography

const StyledKeybox = styled(Col)`
  position: absolute;
  bottom: 8px;

  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: ${theme.color.primary.default};
  color: ${(props) => props.isActive && theme.color.white.default};
  margin-left: ${(props) => props.isHovering && '-40px'};
  background-color: ${(props) =>
    props.isActive ? theme.color.primary.default : theme.color.white.default};
  width: ${(props) =>
    props.isHovering ? '65px !important' : ' 26px !important'};
`
const ImageContainer = styled(Box)`
  width: 150px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-size: cover;
  background-image: url(${(props) => props.image});
`
const StyledButton = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  color: ${theme.color.primary.default};
  background-color: ${theme.color.primary.t.lighten5};
  height: 100%;

  &:hover {
    background-color: ${theme.color.primary.t.lighten3};
  }
`
const StyledText = styled(Text)`
  width: ${({ hasImages }) => (hasImages ? '15ch' : '100%')};
  padding-left: 30px;
`

const StyledBadge = styled(Button)`
  position: absolute;
  border-radius: 50%;
  height: 24px;
  z-index: 100;
  padding: 3px;
  width: 24px;
  right: -4px;
  top: -4px;
`

function KeyBox(props) {
  const { onButtonClick, item, index, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()
  const { t } = useTranslation()

  return (
    <Box
      ref={hoverRef}
      display={hasImages && 'inline-block'}
      mb={2}
      mr={2}
      width="100%">
      <StyledButton hasImages={hasImages} onClick={() => onButtonClick(letter)}>
        {hasImages && <ImageContainer image={item?.choice?.image} />}
        <Row v="center" h="between" noGutters position="relative">
          <Col cw="12" v="center">
            <StyledKeybox isHovering={isHovering} isActive={isActive} mr={1}>
              {isHovering ? `${t('Key')} ${letter}` : letter}
            </StyledKeybox>
            <StyledText hasImages={hasImages}>
              {item?.choice?.name || `Choice ${index + 1}`}
            </StyledText>
          </Col>
          <Col cw="auto">
            <Box position="absolute" top="0" right="0">
              {isActive && (
                <StyledBadge size="small" type="primary">
                  <CheckOutlined />
                </StyledBadge>
              )}
            </Box>
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
