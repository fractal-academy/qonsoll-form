import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import theme from '../../../../styles/theme'
import styled from 'styled-components'

const Item = styled(Button)`
  cursor: ${(props) => props.isCard && 'default !important'};
  background: ${theme.color.dark.t.lighten9};
  width: ${(props) => props.size[0]}px;
  height: ${(props) => props.size[1]}px;
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
  const { children, onClick, size, isCard } = props

  return (
    <Item isCard={isCard} size={size} onClick={onClick}>
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
