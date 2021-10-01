import React from 'react'
import { v4 as uuid } from 'uuid'
import { useHover } from '@umijs/hooks'
import { TEXTINGS } from '../../constants'
import ExtentionItem from './ExtentionItem'
import { Radio, Checkbox, Popconfirm } from 'antd'
import { useTranslation } from '../../context/Translation'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Container, Box, Button } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import {
  useAnswersContextDispatch,
  ANSWERS_DISPATCH_EVENTS
} from '../../context/Answers'

function RatingExtension(props) {
  const { question, onClick, isFormQuiz, isMultiple } = props

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  //[CUSTOM HOOKS]
  const answersDispatch = useAnswersContextDispatch()
  const currentQuestion = useCurrentQuestionContext()
  const { removeButton, conditionRemovingWarn } = useTranslation()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const ratingProps = currentQuestion?.ratingAdditionalOptions || []

  // [CLEAN FUNCTIONS]
  const onRadioChange = (option) => {
    const score = 0

    const data = {
      question,
      answer: { value: option?.target?.value?.answerOption || '' },
      answerId: '1',
      answerScore: isFormQuiz ? score : ''
    }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (!!option) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }

  const onCheckboxChange = (option) => {
    const score = 0

    let answerValues = option?.map((item) => item?.answerOption)

    const data = {
      question,
      answer: { value: answerValues?.join(', ') || '' },
      answerId: '1',
      answerScore: isFormQuiz ? score : ''
    }

    !!data &&
      answersDispatch({
        type: ANSWERS_DISPATCH_EVENTS.ADD_ANSWER,
        payload: data
      })
  }

  const addOption = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        // ...questionConfigurations,
        ratingAdditionalOptions: ratingProps
          ? [
              ...ratingProps,
              {
                answerOption: 'option',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
          : [
              {
                answerOption: 'option',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
      }
    })
  }
  const deleteOption = (index) => {
    ratingProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ratingAdditionalOptions: ratingProps }
    })
  }

  return (
    <Container mt={4} ref={hoverRef}>
      {isMultiple ? (
        <Checkbox.Group disabled={!onClick} onChange={onCheckboxChange}>
          {question?.ratingAdditionalOptions?.map((item, index) => (
            <Box key={index} mb={2} display="flex" alignItems="center">
              <Popconfirm
                title={conditionRemovingWarn || TEXTINGS.conditionRemovingWarn}
                okType="danger"
                onConfirm={() => deleteOption(index)}
                okText={removeButton || TEXTINGS.removeButton}>
                <Box
                  opacity={isHovering ? 1 : 0}
                  color="var(--ql-color-danger)"
                  mr={2}
                  type="text"
                  size="small"
                  p={0}>
                  <DeleteOutlined />
                </Box>
              </Popconfirm>

              <Checkbox value={item || ''} disabled={!onClick}>
                <ExtentionItem
                  item={item}
                  index={index}
                  onClick={onClick}
                  isMultiple={isMultiple}
                  ratingProps={ratingProps}
                  defaultValue={item?.answerOption || ''}
                />
              </Checkbox>
            </Box>
          ))}
        </Checkbox.Group>
      ) : (
        <Radio.Group onChange={onRadioChange}>
          {question?.ratingAdditionalOptions?.map((item, index) => (
            <Box mb={2} key={index} display="flex" alignItems="center">
              <Popconfirm
                title={conditionRemovingWarn || TEXTINGS.conditionRemovingWarn}
                okType="danger"
                onConfirm={() => deleteOption(index)}
                okText={removeButton || 'Delete'}>
                <Box
                  opacity={isHovering ? 1 : 0}
                  color="var(--ql-color-danger)"
                  mr={2}
                  type="text"
                  size="small"
                  p={0}>
                  <DeleteOutlined />
                </Box>
              </Popconfirm>

              <Radio value={item || ''} disabled={!onClick}>
                <ExtentionItem
                  item={item}
                  index={index}
                  onClick={onClick}
                  ratingProps={ratingProps}
                  defaultValue={item?.answerOption || ''}
                />
              </Radio>
            </Box>
          ))}
        </Radio.Group>
      )}

      <Box mt={2} ml={2}>
        <Button type="dashed" onClick={addOption}>
          <PlusOutlined />
        </Button>
      </Box>
    </Container>
  )
}

export default RatingExtension
