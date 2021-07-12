import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Box } from '@qonsoll/react-design'
import { DragableList } from '../../../../components'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { QuestionSimpleView } from '../../../../domains/Question/components'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

function QuestionsList(props) {
  const { data, setNewOrder, onItemClick, disableDelete } = props

  // [CUSTOM_HOOKS]
  const { setData, deleteData } = useFunctions()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onUpdate = (updatedQuestions) => {
    updatedQuestions?.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, item)
        .then(() => {
          item.id === currentQuestion.id &&
            currentQuestionDispatch({
              type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
              payload: item
            })
        })
        .catch((e) => message.error(e.message))
    )
  }

  const handleDelete = (e, questionId) => {
    e.stopPropagation()
    //filter all questions without deleted question
    const updatedData = data?.filter((item) => item.id !== questionId)
    const deletedItemIndex = data?.findIndex(
      (item) => item.id === questionId && item
    )
    //get type of deleted item
    const deletedItemType = data[deletedItemIndex]?.questionType

    //define new current question if delete current question
    const newCurrentQuestion =
      data[deletedItemIndex - 1] || data[deletedItemIndex + 1] || {}

    deleteData(COLLECTIONS.QUESTIONS, questionId).catch((e) =>
      message.error(e.message)
    )

    //update order for all questions
    updatedData?.forEach((item, index) => {
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order:
          deletedItemType === QUESTION_TYPES.WELCOME_SCREEN ? index + 1 : index
      }).catch((e) => message.error(e.message))
    })

    //if deleted item was current question change current question
    currentQuestion.id === questionId &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: newCurrentQuestion
      })

    // remove logic jump conditions for all connected questions
    updatedData?.forEach((item) => {
      let writeToDB = false
      const editedQuestionConfig = item?.questionConfigurations?.map(
        (config) => {
          if (config?.redirectQuestion === questionId) {
            writeToDB = true
            return { ...config, redirectQuestion: '' }
          } else return config
        }
      )
      writeToDB &&
        setData(COLLECTIONS.QUESTIONS, item.id, {
          questionConfigurations: editedQuestionConfig
        })
    })
  }

  // [COMPUTED PROPERTIES]
  const dataSource = useMemo(
    () => (data ? data.sort((a, b) => a.order - b.order) : []),
    [data]
  )
  const filteredDataSource = dataSource?.filter(
    (item) => item.questionType !== QUESTION_TYPES.WELCOME_SCREEN
  )
  const sortable = filteredDataSource.length > 1

  return (
    <>
      {dataSource?.map(
        (item) =>
          item.questionType === QUESTION_TYPES.WELCOME_SCREEN && (
            <Box mr={2} ml="20px" my={3}>
              <QuestionSimpleView
                {...item}
                number="W"
                action={handleDelete}
                onClick={() => onItemClick(item)}></QuestionSimpleView>
            </Box>
          )
      )}
      <DragableList
        itemLayout="horizontal"
        sortable={sortable}
        dataSource={filteredDataSource}
        onUpdate={onUpdate}
        setNewOrder={setNewOrder}
        renderItem={(item, index) => (
          <QuestionSimpleView
            {...item}
            data={data}
            action={handleDelete}
            number={index + 1}
            onClick={() => onItemClick(item, index)}
            disableDelete={disableDelete}
          />
        )}
      />
    </>
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func,
  setNewOrder: PropTypes.func,
  onItemClick: PropTypes.func
}

export default QuestionsList
