import React from 'react'
import moment from 'moment'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import ResponseListItem from './ResponseListItem'

function ResponseList(props) {
  const {
    userAnswerGroup,
    loading,
    onListItemClick,
    setCurrentUserAnswerGroup
  } = props

  // [COMPUTED PROPERTIES]
  const sortedUserAnswerGroup = userAnswerGroup?.sort(
    (a, b) =>
      moment(a.date.toDate()).format('x') - moment(b.date.toDate()).format('x')
  )

  return (
    <Box p={3} width="100%">
      {loading ? (
        <Box display="flex" flex={1} alignItems="center">
          <Spin size="large" />
        </Box>
      ) : (
        sortedUserAnswerGroup?.map((item, index) => (
          <ResponseListItem
            setCurrentUserAnswerGroup={setCurrentUserAnswerGroup}
            key={index}
            index={index}
            user={item.user}
            date={item.date}
            onClick={onListItemClick}
          />
        ))
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
