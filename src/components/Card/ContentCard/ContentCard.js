import React from 'react'
import PropTypes from 'prop-types'
import { Box, Col, Row } from '@qonsoll/react-design'
import { ImageBackground, RoundedCol, RoundedRow } from './ContentCard.styles'

function ContentCard(props) {
  const {
    image,
    // onEdit,
    leftSideMenu,
    brightnessValue,
    children
    // FOR FUTURE FIX
    // topOffset = '56px',
    // wrapperHeight = '100vh'
  } = props

  // const paddingSmall = useMedia({ maxWidth: '768px' })
  // const devicePadding = (paddingSmall && 3) || 4

  return (
    <Row height="100%" noGutters overflowX="hidden" overflowY="hidden">
      {leftSideMenu && (
        <Col mr={3} cw="auto" px="0">
          {leftSideMenu}
        </Col>
      )}
      <RoundedCol flex={1} image={image} px="0" position="relative">
        {image && (
          <ImageBackground image={image} brightnessValue={brightnessValue} />
        )}
        {children}
      </RoundedCol>
    </Row>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node,
  topOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapperHeight: PropTypes.string
}

export default ContentCard
