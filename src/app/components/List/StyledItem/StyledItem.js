import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Item = styled(Button)`
  background: #eceff5;
  width: ${(props) => props.size[0]}px;
  height: ${(props) => props.size[1]}px;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #ebeced;
    border-color: #ebeced;
  }
`

function StyledItem(props) {
  const { children, onClick, size } = props

  return (
    <Item size={size} onClick={onClick}>
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
