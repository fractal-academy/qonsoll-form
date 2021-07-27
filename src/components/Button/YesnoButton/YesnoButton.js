import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { KeyBox } from '../../../components'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'
import { message } from 'antd'
import { useTranslation } from '../../../context/Translation'
import { getQuestionAnswerFromContext } from '../../../helpers'
import { useAnswersContext } from '../../../context/Answers'

function YesnoButton(props) {
  const { onClick, currentSlide, question } = props
  const { order, questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  const answersContext = useAnswersContext()
  // [ADDITIONAL_HOOKS]
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
            answer: { value: '', letterKey: '' }
          }
          question?.isRequired && !questionAnswer
            ? message.error(
                answerRequiredMessageError ||
                  'It`s required question, please answer'
              )
            : onClick?.(answerData)
        } else {
          const key = `${event.key}`.toUpperCase()
          const currentChoice = questionConfigurations?.[key === 'Y' ? 0 : 1]
          onButtonClick({
            letter: key,
            choice: currentChoice
          })
        }
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [COMPUTED PROPERTIES]
  const letters = []
  questionConfigurations?.map((item) =>
    letters.push(item?.answerOption?.[0].toUpperCase())
  )

  const mappedChoices = useMemo(
    () =>
      questionConfigurations?.map((choiceData) => ({
        letter: choiceData?.answerOption?.[0].toUpperCase(),
        choice: choiceData
      })),
    [questionConfigurations]
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = (choiceData) => {
    const { letter, choice } = choiceData
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.answerOption || '', letterKey: letter }
      const data = {
        question,
        answer,
        answerId: choice?.answerOptionId || ''
      }
      onClick && setTimeout(onClick, 700, data)
    }
  }
  return (
    <Box display="block">
      {mappedChoices?.map((item, index) => (
        <Box key={index} mb={2} mx={2}>
          <KeyBox
            isActive={buttonKey === item?.letter}
            onButtonClick={onButtonClick}
            item={item}
            buttonKey={buttonKey}
          />
        </Box>
      ))}
    </Box>
  )
}

YesnoButton.propTypes = {
  onClick: PropTypes.func,
  order: PropTypes.number,
  currentSlide: PropTypes.number
}

export default YesnoButton
