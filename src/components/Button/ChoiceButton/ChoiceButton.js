import React, { useMemo, useState } from 'react'

import ChoiceList from './ChoiceList'
import ImageChoiceList from './ImageChoiceList'
import { KeyBox } from '../../../components'
import PropTypes from 'prop-types'
import { getQuestionAnswerFromContext } from '../../../helpers'
import { message } from 'antd'
import { useAnswersContext } from '../../../context/Answers'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

let startLetter = 65

function ChoiceButton(props) {
  const {
    choices,
    onClick,
    question,
    hasImages,
    isFormQuiz,
    currentSlide,
    answersScoreData
  } = props

  const { order } = question

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const answersContext = useAnswersContext()

  // [COMPUTED PROPERTIES]
  const mappedChoices = useMemo(
    () =>
      choices?.map((el, index) => ({
        letter: String.fromCharCode(startLetter + index),
        choice: el
      })),
    [choices]
  )
  const letters = useMemo(
    () => (mappedChoices ? mappedChoices?.map(({ letter }) => letter) : []),
    [mappedChoices]
  )

  useKeyPress(
    (event) => ![].includes(event.key) && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        // When pressed enter and question not required it will go to next question,
        // if question required - display message that u should enter data
        if (event.keyCode === 13) {
          //try to get current slide question value from context
          const questionAnswer = getQuestionAnswerFromContext(
            answersContext,
            question
          )

          const answer = { value: '', letterKey: '' }
          const answerData = questionAnswer || {
            question,
            answer: !hasImages ? answer : { ...answer, image: '' }
          }

          question?.isRequired && !questionAnswer
            ? message.error(t('The answer is required'))
            : onClick?.(answerData)
        } else {
          const key = `${event.key}`.toUpperCase()
          let index = key.charCodeAt(0) - startLetter

          onButtonClick({ letter: key, choice: choices[index] })
        }
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = ({ letter, choice }) => {
    //answer score if configured
    const score =
      answersScoreData?.find(
        (item) => item?.answerOptionId === choice?.answerOptionId
      )?.score || ''
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.answerOption || '', letterKey: letter }

      //if picture choice add field with image link
      const data = {
        question,
        answer: !hasImages ? answer : { ...answer, image: choice?.image || '' },
        answerId: choice?.answerOptionId || '',
        answerScore: isFormQuiz ? score : ''
      }

      onClick && setTimeout(onClick, 700, data)
    }
  }

  return hasImages ? (
    <ImageChoiceList
      data={mappedChoices}
      hasImages={hasImages}
      buttonKey={buttonKey}
      onButtonClick={onButtonClick}
    >
      <KeyBox />
    </ImageChoiceList>
  ) : (
    <ChoiceList
      data={mappedChoices}
      hasImages={hasImages}
      buttonKey={buttonKey}
      onButtonClick={onButtonClick}
    >
      <KeyBox />
    </ChoiceList>
  )
}

ChoiceButton.propTypes = {
  onClick: PropTypes.func,
  choices: PropTypes.array,
  hasImages: PropTypes.bool,
  currentSlide: PropTypes.number,
  question: PropTypes.object,
  isFormQuiz: PropTypes.bool,
  answersScoreData: PropTypes.array
}

export default ChoiceButton
