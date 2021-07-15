import { Box } from '@qonsoll/react-design'
import { Spin } from 'antd'
import React from 'react'
import { EmptyState } from '../../../Form/components/FormConditionsForm/FormConditionsForm.styles'
import ResponseListItem from './ResponseListItem'
import PropTypes from 'prop-types'

function ResponseList(props) {
  const { userAnswerGroup, loading, onListItemClick } = props

  return (
    <Box display="flex" flex={1} flexDirection="column" alignItems="center">
      {loading ? (
        <Box display="flex" flex={1} alignItems="center">
          <Spin size="large" />
        </Box>
      ) : (
        <>
          {userAnswerGroup?.length > 0 ? (
            userAnswerGroup?.map((item, index) => (
              <ResponseListItem
                key={index}
                index={index}
                user={item.user}
                date={item.date}
                onClick={onListItemClick}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </Box>
  )
}

ResponseList.propTypes = {
  userAnswerGroup: PropTypes.array,
  loading: PropTypes.bool,
  onListItemClick: PropTypes.func
}

export default ResponseList
