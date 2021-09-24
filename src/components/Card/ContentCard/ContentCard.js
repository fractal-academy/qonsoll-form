import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from '@qonsoll/react-design'
import { ImageBackground, RoundedCol } from './ContentCard.styles'

function ContentCard(props) {
  const { image, leftSideMenu, brightnessValue, children } = props

  return (
    <Row
      flexGrow={1}
      noGutters
      overflowX="hidden"
      overflowY="hidden"
      style={{ flexGrow: 1 }}>
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
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.node,
  leftSideMenu: PropTypes.node,
  brightnessValue: PropTypes.number
}

export default ContentCard
