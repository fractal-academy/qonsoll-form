import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import { Row, Col, Box } from '@qonsoll/react-design'

const Wrapper = styled(Col)`
  margin: 24px;
  width: 100%;
  padding-bottom: 2px;
  height: ${(props) => props.onEdit && '100%'};
  display: flex;
  align-items: center;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.color.white.default};
`
function ContentCard(props) {
  const { onEdit, leftSideMenu, children } = props

  return (
    <Row width="100%" height="100%" noGutters>
      {leftSideMenu && (
        <Col cw="auto" mx={4}>
          {leftSideMenu}
        </Col>
      )}
      <Wrapper cw="auto" onEdit={onEdit}>
        {children}
      </Wrapper>
    </Row>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard
