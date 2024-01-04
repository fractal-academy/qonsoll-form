import {
  ANSWERS_DISPATCH_EVENTS,
  useAnswersContextDispatch
} from '../../context/Answers'
import { Checkbox, Popconfirm, Radio } from 'antd'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import { Button } from 'antd'
import ExtentionItem from './ExtentionItem'
import PropTypes from 'prop-types'
import React from 'react'
import { useHover } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'
import { v4 as uuid } from 'uuid'

function RatingExtension(props) {
  const {
    question,
    onClick,
    isFormQuiz,
    isMultiple,
    setSelectedValue,
    radioChecked,
    checkboxChecked
  } = props

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  //[CUSTOM HOOKS]
  const { t } = useTranslations()
  const answersDispatch = useAnswersContextDispatch()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const ratingProps = currentQuestion?.ratingAdditionalOptions || []

  // [CLEAN FUNCTIONS]
  const onRadioChange = (option) => {
    setSelectedValue(0)
    const score = 0

    const data = {
      question,
      answer: { value: option?.target?.value?.answerOption || '' },
      answerId: '1',
      answerScore: isFormQuiz ? score : ''
    }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (option) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }

  const onCheckboxChange = (option) => {
    setSelectedValue(0)
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
                answerOption: 'Extended option',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
          : [
              {
                answerOption: 'Extended option',
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
    <div mt={4} ref={hoverRef}>
      {isMultiple ? (
        <Checkbox.Group disabled={!onClick} onChange={onCheckboxChange}>
          {question?.ratingAdditionalOptions?.map((item, index) => (
            <div key={index} mb={2} display="flex" alignItems="center">
              {!onClick && (
                <Popconfirm
                  okType="danger"
                  title={t('Delete this item?')}
                  onConfirm={() => deleteOption(index)}
                  okText={t('Delete')}
                  cancelText={t('Cancel')}
                >
                  <div
                    p={0}
                    mr={2}
                    type="text"
                    size="small"
                    opacity={isHovering ? 1 : 0}
                    color="var(--ql-color-danger)"
                  >
                    <DeleteOutlined />
                  </div>
                </Popconfirm>
              )}
              <Checkbox
                value={item || ''}
                disabled={!onClick}
                checked={checkboxChecked}
              >
                <ExtentionItem
                  item={item}
                  index={index}
                  onClick={onClick}
                  isMultiple={isMultiple}
                  ratingProps={ratingProps}
                  defaultValue={item?.answerOption || ''}
                />
              </Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      ) : (
        <Radio.Group onChange={onRadioChange}>
          {question?.ratingAdditionalOptions?.map((item, index) => (
            <div mb={2} key={index} display="flex" alignItems="center">
              {!onClick && (
                <Popconfirm
                  title={t('Delete this item?')}
                  okType="danger"
                  onConfirm={() => deleteOption(index)}
                  okText={t('Delete')}
                  cancelText={t('Cancel')}
                >
                  <div
                    opacity={isHovering ? 1 : 0}
                    color="var(--ql-color-danger)"
                    mr={2}
                    type="text"
                    size="small"
                    p={0}
                  >
                    <DeleteOutlined />
                  </div>
                </Popconfirm>
              )}

              <Radio
                value={item || ''}
                disabled={!onClick}
                radioChecked={radioChecked}
              >
                <ExtentionItem
                  item={item}
                  index={index}
                  onClick={onClick}
                  ratingProps={ratingProps}
                  defaultValue={item?.answerOption || ''}
                />
              </Radio>
            </div>
          ))}
        </Radio.Group>
      )}
      {!onClick && (
        <div mt={2} ml={2}>
          <Button type="dashed" onClick={addOption}>
            <PlusOutlined />
          </Button>
        </div>
      )}
    </div>
  )
}

RatingExtension.propTypes = {
  question: PropTypes.object,
  onClick: PropTypes.func,
  isFormQuiz: PropTypes.bool,
  isMultiple: PropTypes.bool,
  setSelectedValue: PropTypes.func,
  radioChecked: PropTypes.bool,
  checkboxChecked: PropTypes.bool
}

export default RatingExtension
