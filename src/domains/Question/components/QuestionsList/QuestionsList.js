import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import React, { useMemo } from 'react'

import { Box } from '@qonsoll/react-design'
import { DragableList } from '../../../../components'
import PropTypes from 'prop-types'
import { QuestionSimpleView } from '../../../../domains/Question/components'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'

function QuestionsList(props) {
  const {
    data,
    setNewOrder,
    onItemClick,
    disableDelete,
    questionsData,
    endings
  } = props
  // [CUSTOM_HOOKS]
  const { setData, deleteData } = useFunctions()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onUpdate = (updatedQuestions) => {
    //check if questions contain Welcome screen
    const containWelcomeScreen = questionsData?.some(
      (q) => q?.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )

    //update current questions order after drag and drop
    updatedQuestions?.forEach((item, index) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        order: questionsData
          ? containWelcomeScreen
            ? questionsData?.length + index
            : questionsData?.length + item?.order
          : item?.order
      })
        .then(() => {
          item.id === currentQuestion.id &&
            currentQuestionDispatch({
              type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
              payload: {
                ...item,
                order: questionsData
                  ? containWelcomeScreen
                    ? questionsData?.length + index
                    : questionsData?.length + item?.order
                  : item?.order
              }
            })
        })
        .catch((e) => message.error(e.message))
    )
  }

  const handleDelete = async (e, questionId) => {
    e.stopPropagation()

    //filter all questions without deleted question
    let updatedData = data?.filter((item) => item.id !== questionId)

    //search deleted item index
    const deletedItemIndex = data?.findIndex(
      (item) => item.id === questionId && item
    )

    //check if questions contain Welcome screen
    const containWelcomeScreen = (questionsData || updatedData).some(
      (q) => q.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )

    //define questions length if this list used for endings to define endings correct order
    const questionsLength = questionsData?.length

    //update order for all questions/endings
    updatedData = updatedData?.map((item, index) => {
      //define updated order for questions/endings
      let updatedOrder = questionsLength ? questionsLength + index : index
      if (!containWelcomeScreen) {
        updatedOrder++
      }

      //update var that contain questions/endings excluding
      item.order = updatedOrder
      setData(COLLECTIONS.QUESTIONS, item?.id, item).catch((e) =>
        message.error(e.message)
      )
      //return item with updated order
      return item
    })

    //delete question/ending
    await deleteData(COLLECTIONS.QUESTIONS, questionId).catch((e) =>
      message.error(e.message)
    )

    // remove logic jump conditions for all connected questions
    await updatedData?.forEach((item) => {
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
        }).catch((e) => message.error(e.message))
    })

    //change current question
    currentQuestion.id === questionId &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload:
          updatedData?.[deletedItemIndex] ||
          updatedData?.[deletedItemIndex - 1] ||
          {}
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
  const sortable = filteredDataSource?.length > 1

  return (
    <Box>
      {dataSource?.map(
        (item) =>
          item.questionType === QUESTION_TYPES.WELCOME_SCREEN && (
            <Box pl="24px" mb="8px" key={item}>
              <QuestionSimpleView
                {...item}
                endings={endings}
                number="W"
                hiddenDelete
                action={handleDelete}
                onClick={() => onItemClick(item)}
              />
            </Box>
          )
      )}
      <DragableList
        itemLayout="horizontal"
        sortable={sortable}
        onUpdate={onUpdate}
        dataSource={filteredDataSource}
        setNewOrder={setNewOrder}
        renderItem={(item, index) => (
          <QuestionSimpleView
            {...item}
            data={data}
            endings={endings}
            action={handleDelete}
            number={index + 1}
            onClick={() => onItemClick(item, index)}
            disableDelete={disableDelete}
          />
        )}
      />
    </Box>
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func,
  setNewOrder: PropTypes.func,
  onItemClick: PropTypes.func
}

export default QuestionsList
