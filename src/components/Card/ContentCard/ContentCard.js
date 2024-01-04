import { Col, Row } from 'antd'
import { ImageBackground, RoundedCol } from './ContentCard.styles'

import PropTypes from 'prop-types'
import React from 'react'

function ContentCard(props) {
  const { image, onEdit, leftSideMenu, brightnessValue, children } = props

  return (
    <Row
      display={onEdit ? ['none', 'flex'] : 'flex'}
      flexGrow={1}
      noGutters
      overflowX="hidden"
      overflowY="hidden"
      style={{ flexGrow: 1 }}
    >
      {leftSideMenu && (
        <Col mr="16px" cw="auto" px="0">
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
  onEdit: PropTypes.bool,
  children: PropTypes.node,
  leftSideMenu: PropTypes.node,
  brightnessValue: PropTypes.number
}

export default ContentCard
