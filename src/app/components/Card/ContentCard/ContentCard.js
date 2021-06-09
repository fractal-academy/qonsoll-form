import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Row, Col, Box } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

const ContentRow = styled(Row)`
  margin: 32px;
  display: flex;
  height: ${(props) => props.onEdit && '100%'};
`

const ContentColumn = styled(Col)`
  ${({ theme, image }) => `
  flex: 1;
  position: relative;
  background: ${
    !image &&
    (theme?.color?.white.default || typeformTheme?.color.white.default)
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  `}
`
const ImageBackground = styled(Box)`
  ${({ theme, image, brightnessValue }) => `
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${image});
  filter: brightness(${brightnessValue}%);
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  `}
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
  children: PropTypes.node
}

export default ContentCard
