import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from '@qonsoll/react-design'
import useMedia from 'use-media'
import {
  ContentRow,
  ContentColumn,
  ImageBackground
} from './ContentCard.styles'

function ContentCard(props) {
  const {
    image,
    onEdit,
    leftSideMenu,
    brightnessValue,
    children
    // FOR FUTURE FIX
    // topOffset = '56px',
    // wrapperHeight = '100vh'
  } = props

  const paddingSmall = useMedia({ maxWidth: '768px' })
  const devicePadding = (paddingSmall && 3) || 4

  return (
    <ContentRow
      negativeBlockMargin
      p={devicePadding}
      height="inherit"
      onEdit={onEdit}
      noGutters>
      {leftSideMenu && (
        <Col mr={3} cw="auto">
          {leftSideMenu}
        </Col>
      )}
      <ContentColumn image={image}>
        {image && (
          <ImageBackground image={image} brightnessValue={brightnessValue} />
        )}
        {children}
      </ContentColumn>
    </ContentRow>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node,
  topOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapperHeight: PropTypes.string
}

export default ContentCard
