import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Row, Col } from '@qonsoll/react-design'
import useMedia from 'use-media'
import { useTranslation } from '../../../context/Translation'
import { StyledRangeButton } from './RangeButton.styles'
import { useAnswersContext } from '../../../context/Answers'
import { getQuestionAnswerFromContext } from '../../../helpers'

function RangeButton(props) {
  const { onClick, currentSlide, question } = props
  const { order, questionConfigurations } = question

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()
  const cwMedium = useMedia({ minWidth: '1100px' })
  const cwSmall = useMedia({ minWidth: '500px' })

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  const answersContext = useAnswersContext()
  // [ADDITIONAL HOOKS]
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

          const answerData = !!questionAnswer
            ? questionAnswer
            : {
                question,
                answer: { value: '' }
              }

          question?.isRequired && !questionAnswer
            ? message.error(
                answerRequiredMessageError ||
                  'It`s required question, please answer'
              )
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
    if (range?.includes(Number(number)) && currentSlide === order) {
      setButtonKey(number)
      const data = {
        question,
        answer: { value: number }
      }
      onClick && setTimeout(onClick, 700, data)
    }
  }

  return (
    <Row display="flex" width="100%" noGutters>
      {range?.map((item) => (
        <Col key={item} cw={columnWidth} mr={2} mb={2}>
          <StyledRangeButton
            key={item}
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
  to: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired
}
RangeButton.defaultProps = {
  from: 1,
  to: 5
}

export default RangeButton
