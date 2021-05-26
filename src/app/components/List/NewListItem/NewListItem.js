import React from 'react'
import PropTypes from 'prop-types'
import { StyledItem } from 'components'
import { PlusOutlined } from '@ant-design/icons'

function NewListItem(props) {
  const { size, onClick } = props

  return (
    <StyledItem size={size} onClick={onClick}>
      <PlusOutlined />
    </StyledItem>
  )
}

NewListItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func
}

export default NewListItem
