import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { COLLECTIONS } from 'app/constants'
import { DragableList } from 'app/components'
import { setData, deleteData } from 'app/services/Firestore'
import { QuestionSimpleView } from 'domains/Question/components'

function QuestionsList(props) {
  const { data, setNewOrder, onItemClick } = props

  // [CLEAN FUNCTIONS]
  const onUpdate = (data) => {
    data.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        order: item?.order,
        ...item
      }).catch((e) => message.error(e.message))
    )
  }
  const handleDelete = (questionId) => {
    deleteData(COLLECTIONS.QUESTIONS, questionId)
      .then()
      .then(console.log('success'))
      .catch((e) => message.error(e.message))
  }
  const dataSource = useMemo(
    () => (data ? data.sort((a, b) => a.order - b.order) : []),
    [data]
  )

  return (
    <DragableList
      itemLayout="horizontal"
      dataSource={dataSource}
      onUpdate={onUpdate}
      setNewOrder={setNewOrder}
      renderItem={(item, index) => (
        <QuestionSimpleView
          {...item}
          action={handleDelete}
          number={index + 1}
          onClick={() => onItemClick(item, index)}
        />
      )}
    />
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func,
  setNewOrder: PropTypes.func,
  onItemClick: PropTypes.func
}

export default QuestionsList
