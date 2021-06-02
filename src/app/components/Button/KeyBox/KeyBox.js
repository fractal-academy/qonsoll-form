import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { useHover } from '@umijs/hooks'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

const { Text } = Typography

const StyledKeybox = styled(Col)`
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
  width: fit-content;
  border-radius: 8px;
  padding: 8px;
  color: ${theme.color.primary.default};
  background-color: ${theme.color.primary.t.lighten5};
  height: fit-content;

  &:hover {
    background-color: ${theme.color.primary.t.lighten3};
  }
`
const StyledIcon = styled(CheckOutlined)`
  font-size: 18px;
`
const StyledText = styled(Text)`
  width: 10ch;
`

function KeyBox(props) {
  const { onButtonClick, item, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  return (
    <Box ref={hoverRef} display={hasImages && 'inline-block'} mb={2} mr={3}>
      <StyledButton hasImages={hasImages} onClick={() => onButtonClick(letter)}>
        {hasImages && <ImageContainer image={item?.choice?.image} />}
        <Row v="center" h="between" noGutters>
          <Col cw="auto" v="center">
            <StyledKeybox isHovering={isHovering} isActive={isActive} mr={1}>
              {isHovering ? `Key ${letter}` : letter}
            </StyledKeybox>
            <StyledText ellipsis>{item?.choice?.name}</StyledText>
          </Col>
          <Col cw="auto">
            <Box>{isActive && <StyledIcon />}</Box>
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
