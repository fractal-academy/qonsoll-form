import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { COLLECTIONS } from '../../../../constants'
import { DragableList } from '../../../../components'
import { setData } from '../../../../services/Firestore'
import { QuestionSimpleView } from '../../../../domains/Question/components'

function QuestionsList(props) {
  const { action, data, setNewOrder, onItemClick } = props

  // [CLEAN FUNCTIONS]
  const onUpdate = (data) => {
    data.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        order: item?.order
      }).catch((e) => message.error(e.message))
    )
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
          action={action}
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
