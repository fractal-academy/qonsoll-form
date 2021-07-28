import React from 'react'
import PropTypes from 'prop-types'
import { Item } from './StyledItem.styles'

function StyledItem(props) {
  const { children, onClick, isCard, disable } = props

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
