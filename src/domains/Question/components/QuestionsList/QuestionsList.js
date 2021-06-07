import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { COLLECTIONS } from '../../../../constants'
import { DragableList } from '../../../../components'
import { QuestionSimpleView } from '../../../../domains/Question/components'
import useFunctions from '../../../../hooks/useFunctions'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

function QuestionsList(props) {
  const { action, data, setNewOrder, onItemClick } = props

  // [CUSTOM_HOOKS]
  const { setData, deleteData } = useFunctions()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onUpdate = (data) => {
    data.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, item).catch((e) =>
        message.error(e.message)
      )
    )
  }

  const handleDelete = (e, questionId) => {
    e.stopPropagation()
    //filter all questions without deleted question
    const updatedData = data?.filter((item) => item.id !== questionId)
    const deletedItemIndex = data?.findIndex(
      (item) => item.id === questionId && item
    )
    const newCurrentQuestion =
      data[deletedItemIndex - 1] || data[deletedItemIndex + 1] || {}

    deleteData(COLLECTIONS.QUESTIONS, questionId).catch((e) =>
      message.error(e.message)
    )
    //update order for all questions
    updatedData?.forEach((item, index) => {
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order: index
      }).catch((e) => message.error(e.message))
    })

    currentQuestion.id === questionId &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: newCurrentQuestion
      })
  }
  // [COMPUTED PROPERTIES]
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
