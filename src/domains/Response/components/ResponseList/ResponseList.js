import PropTypes from 'prop-types'
import React from 'react'
import ResponseListItem from './ResponseListItem'
import { Spin } from 'antd'
import moment from 'moment'

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
    <div p={3} width="100%">
      {loading ? (
        <div display="flex" flex={1} alignItems="center">
          <Spin size="large" />
        </div>
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
    </div>
  )
}

ResponseList.propTypes = {
  userAnswerGroup: PropTypes.array,
  loading: PropTypes.bool,
  onListItemClick: PropTypes.func,
  setCurrentUserAnswerGroup: PropTypes.func
}

export default ResponseList
