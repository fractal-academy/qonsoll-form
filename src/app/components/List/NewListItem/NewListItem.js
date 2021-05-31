import React from 'react'
import PropTypes from 'prop-types'
import { StyledItem } from 'components'
import { PlusOutlined } from '@ant-design/icons'

function NewListItem(props) {
  const { onClick } = props

  return (
    <StyledItem onClick={onClick}>
      <PlusOutlined />
    </StyledItem>
  )
}

NewListItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func
}

export default NewListItem
