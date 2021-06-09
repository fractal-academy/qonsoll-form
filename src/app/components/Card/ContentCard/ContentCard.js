import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'

const Wrapper = styled(Box)`
  ${({ theme }) => `
  margin: 24px;
  padding-bottom: 2px;
  //height: -webkit-fill-available;
  //height: 85vh;
  display: flex;
  align-items: center;
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  background-color: ${
    theme?.color?.white?.default || typeformTheme?.color?.white?.default
  };
`}
`
function ContentCard(props) {
  const { children } = props

  return <Wrapper>{children}</Wrapper>
}

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard
