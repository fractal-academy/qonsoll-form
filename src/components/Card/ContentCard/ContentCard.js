import React from 'react'
import PropTypes from 'prop-types'
import { Col } from '@qonsoll/react-design'
import { ImageBackground, RoundedRow } from './ContentCard.styles'

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
    <RoundedRow mt={2} height="100%" bg="white" noGutters borderRadius="8px">
      {leftSideMenu && (
        <Col mr={3} cw="auto" px="0">
          {leftSideMenu}
        </Col>
      )}
      <Col flex={1} image={image} px="0" position="relative">
        {image && (
          <ImageBackground image={image} brightnessValue={brightnessValue} />
        )}
        {children}
      </Col>
    </RoundedRow>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node,
  topOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapperHeight: PropTypes.string
}

export default ContentCard
