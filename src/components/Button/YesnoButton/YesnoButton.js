import React, { useMemo, useState } from 'react'

import { Box } from '@qonsoll/react-design'
import { KeyBox } from '../../../components'
import PropTypes from 'prop-types'
import { TEXTINGS } from '../../../constants'
import { getQuestionAnswerFromContext } from '../../../helpers'
import { message } from 'antd'
import { useAnswersContext } from '../../../context/Answers'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../../context/Translation'

function YesnoButton(props) {
  const { onClick, question, isFormQuiz, currentSlide, answersScoreData } =
    props
  const { order, questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { requiredAnswerMessage } = useTranslation()
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
                requiredAnswerMessage || TEXTINGS.requiredAnswerMessage
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

    //answer score if configured
    const score =
      answersScoreData?.find(
        (item) => item?.answerOptionId === choice?.answerOptionId
      )?.score || ''
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.answerOption || '', letterKey: letter }
      const data = {
        question,
        answer,
        answerId: choice?.answerOptionId || '',
        answerScore: isFormQuiz ? score : ''
      }

      onClick && setTimeout(onClick, 700, data)
    }
  }

  return (
    <Box display="block">
      {mappedChoices?.map((item, index) => (
        <Box key={index} mb={2}>
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
