import React from 'react'
import PropTypes from 'prop-types'
import { StyledItem } from '../../../components'
import { PlusOutlined } from '@ant-design/icons'

function NewListItem(props) {
  const { size, onClick, disableAddButton } = props

  return (
    <StyledItem size={size} onClick={onClick} disable={disableAddButton}>
      <PlusOutlined />
    </StyledItem>
  )
}

NewListItem.propTypes = {
  size: PropTypes.array,
  onClick: PropTypes.func
}

export default NewListItem
