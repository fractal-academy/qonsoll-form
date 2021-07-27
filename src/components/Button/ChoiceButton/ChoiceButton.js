import PropTypes from 'prop-types'
import { KeyBox } from '../../../components'
import { useKeyPress } from '@umijs/hooks'
import { Row, Col } from '@qonsoll/react-design'
import React, { useMemo, useState } from 'react'
import useMedia from 'use-media'
import { message } from 'antd'
import { useTranslation } from '../../../context/Translation'
import { useAnswersContext } from '../../../context/Answers'
import { getQuestionAnswerFromContext } from '../../../helpers'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, hasImages, currentSlide, question } = props
  const { order } = question

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  const answersContext = useAnswersContext()
  // [ADDITIONAL HOOKS]
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
  const phoneSize = useMedia({ maxWidth: '500px' })

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
            ? message.error(
                answerRequiredMessageError ||
                  'It`s required question, please answer'
              )
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
  const onButtonClick = (props) => {
    const { letter, choice } = props

    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.answerOption || '', letterKey: letter }
      //if picture choice add field with image link
      const data = {
        question,
        answer: !hasImages ? answer : { ...answer, image: choice?.image || '' },
        answerId: choice?.answerOptionId || ''
      }

      onClick && setTimeout(onClick, 700, data)
    }
  }

  return (
    <Row noGutters h={phoneSize && 'center'}>
      {mappedChoices?.map((item, index) => (
        <Col key={index} cw={hasImages ? (phoneSize ? '10' : 'auto') : '12'}>
          <KeyBox
            index={index}
            item={item}
            hasImages={hasImages}
            buttonKey={buttonKey}
            onButtonClick={onButtonClick}
            isActive={buttonKey === item.letter}
          />
        </Col>
      ))}
    </Row>
  )
}

ChoiceButton.propTypes = {
  order: PropTypes.number,
  onClick: PropTypes.func,
  choices: PropTypes.array,
  hasImages: PropTypes.bool,
  currentSlide: PropTypes.number
}

export default ChoiceButton
