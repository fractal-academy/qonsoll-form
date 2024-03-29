import { Col, Row } from '@qonsoll/react-design'
import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { StyledRangeButton } from './RangeButton.styles'
import { getQuestionAnswerFromContext } from '../../../helpers'
import { message } from 'antd'
import { useAnswersContext } from '../../../context/Answers'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

function RangeButton(props) {
  const { onClick, question, isFormQuiz, currentSlide, answersScoreData } =
    props
  const { order, questionConfigurations } = question

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()
  const cwMedium = window.innerWidth >= 1100
  const cwSmall = window.innerWidth >= 500

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const answersContext = useAnswersContext()
  useKeyPress(
    (event) =>
      (![].includes(event.key) || event.keyCode === 13) &&
      currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        if (event.keyCode === 13) {
          const questionAnswer = getQuestionAnswerFromContext(
            answersContext,
            question
          )

          const answerData = questionAnswer || {
            question,
            answer: { value: '' }
          }

          question?.isRequired && !questionAnswer
            ? message.error(t('The answer is required'))
            : onClick?.(answerData)
        } else {
          onButtonClick(event.key)
        }
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [COMPUTED PROPERTIES]
  const range = questionConfigurations?.map((el) => el?.answerOption)
  const columnWidth = (cwMedium && 2) || (cwSmall && 3) || 12

  // [CLEAN FUNCTIONS]
  const onButtonClick = (number) => {
    const IntValue = Number(number)
    //get data of answered option from question configurations data
    const optionData = questionConfigurations?.[IntValue - 1]
    //answer score if configured
    const score =
      answersScoreData?.find(
        (item) => item?.answerOptionId === optionData?.answerOptionId
      )?.score || ''
    if (range?.includes(IntValue) && currentSlide === order) {
      setButtonKey(IntValue)
      const data = {
        question,
        answer: { value: IntValue },
        answerId: optionData?.answerOptionId || '',
        answerScore: isFormQuiz ? score : ''
      }

      onClick && setTimeout(onClick, 700, data)
    }
  }

  return (
    <Row display="flex" h="center" width="100%" noGutters>
      {range?.map((item) => (
        <Col key={item} cw={columnWidth} mr="16px" mb="16px">
          <StyledRangeButton
            key={item}
            onTouchStart={() => onButtonClick(item)}
            onClick={() => onButtonClick(item)}
            onMouseDown={(e) => e.preventDefault()}
            isActive={Number(buttonKey) === item}>
            {item}
          </StyledRangeButton>
        </Col>
      ))}
    </Row>
  )
}

RangeButton.propTypes = {
  onClick: PropTypes.func,
  question: PropTypes.object,
  isFormQuiz: PropTypes.bool,
  currentSlide: PropTypes.number,
  answersScoreData: PropTypes.array
}
RangeButton.defaultProps = {
  from: 1,
  to: 5
}

export default RangeButton
