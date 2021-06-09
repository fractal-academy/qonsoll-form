import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Row, Col, Box } from '@qonsoll/react-design'

const ContentRow = styled(Row)`
  margin: 32px;
  display: flex;
  height: ${(props) => props.onEdit && '100%'};
`

const ContentColumn = styled(Col)`
  flex: 1;
  position: relative;
  border-radius: ${theme.borderRadius.md};
  background-color: ${(props) => !props.image && theme.color.white.default};
`
const ImageBackground = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${theme.borderRadius.md};
  background-image: ${(props) => props.image};
  filter: brightness(${(props) => props.brightnessValue}%);
`
function ContentCard(props) {
  const { image, onEdit, leftSideMenu, brightnessValue, children } = props

  return (
    <ContentRow onEdit={onEdit} noGutters>
      {leftSideMenu && (
        <Col mr={3} cw="auto">
          {leftSideMenu}
        </Col>
      )}
      <ContentColumn>
        {image && (
          <ImageBackground brightnessValue={brightnessValue} image={image} />
        )}
        {children}
      </ContentColumn>
    </ContentRow>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard
