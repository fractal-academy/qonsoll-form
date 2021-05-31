import React from 'react'
import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import theme from '../../../../styles/theme'
import styled from 'styled-components'

const Item = styled(Box)`
  margin-right: 10px;
  margin-bottom: 20px;
  padding: 6px;
  cursor: ${(props) => props.isCard && 'default !important'};
  background: ${theme.color.dark.t.lighten9};
  width: -webkit-fill-available;
  height: fit-content;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.color.dark.t.lighten8};
    border-color: ${theme.color.dark.t.lighten8};
  }
`

function StyledItem(props) {
  const { children, onClick, isCard,disable } = props

  return (
    <Item isCard={isCard} onClick={!disable && onClick}>
      {children}
    </Item>
  )
}
StyledItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default StyledItem
