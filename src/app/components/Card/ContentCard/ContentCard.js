import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Row, Col } from '@qonsoll/react-design'

const ContentColumn = styled(Col)`
  flex: 1;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.color.white.default};
`

function ContentCard(props) {
  const { onEdit, leftSideMenu, children } = props

  return (
    <Row height={onEdit && '100%'} display="flex" m={4} noGutters>
      {leftSideMenu && (
        <Col mr={3} cw="auto">
          {leftSideMenu}
        </Col>
      )}
      <ContentColumn>{children}</ContentColumn>
    </Row>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard
