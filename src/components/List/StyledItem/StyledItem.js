import { Item } from './StyledItem.styles'
import PropTypes from 'prop-types'
import React from 'react'

function StyledItem(props) {
  const { children, onClick, isCard, disable } = props

  return (
    <Item isCard={isCard} onClick={!disable && onClick}>
      {children}
    </Item>
  )
}

StyledItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  isCard: PropTypes.bool,
  disable: PropTypes.bool
}

export default StyledItem
