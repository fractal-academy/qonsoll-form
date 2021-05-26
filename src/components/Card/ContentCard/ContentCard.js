import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

const Wrapper = styled(Box)`
  border-radius: 12px;
  background-color: white;
`
function ContentCard(props) {
  const { children } = props

  return <Wrapper>{children}</Wrapper>
}

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard