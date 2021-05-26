import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import { ListItem, NewListItem } from 'components'

function StaticList(props) {
  const { data, size, onClick } = props

  return (
    <Box display="contents">
      {data?.map((item) => (
        <Box key={item.id} mr={4} mb={4}>
          <ListItem data={item} size={size} />
        </Box>
      ))}

      <NewListItem size={size} onClick={onClick} />
    </Box>
  )
}

StaticList.propTypes = {
  size: PropTypes.array,
  data: PropTypes.array,
  onClick: PropTypes.func
}

export default StaticList
