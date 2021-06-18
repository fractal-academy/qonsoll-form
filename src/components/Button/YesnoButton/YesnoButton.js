import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { KeyBox } from '../../../components'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'
import { message } from 'antd'
import { useTranslation } from '../../../context/Translation'

function YesnoButton(props) {
  const { onClick, currentSlide, question } = props
  const { order } = question

  //[CUSTOM HOOKS]
  const { yes, no, answerRequiredMessageError } = useTranslation()

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) =>
      (![].includes(event.key) || event.keyCode === 13) &&
      currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        if (event.keyCode === 13) {
          const answerData = {
            question,
            answer: { value: '', letterKey: '' }
          }
          !question?.isRequired
            ? onClick && onClick(answerData)
            : message.error(
                answerRequiredMessageError ||
                  'It`s required question, please answer'
              )
        } else {
          const key = `${event.key}`.toUpperCase()
          const currentChoice = key === 'Y' ? 'Yes' : 'No'
          onButtonClick({
            letter: key,
            choice: { answerOption: currentChoice }
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
  const mappedChoices = [
    {
      letter: 'Y',
      choice: {
        answerOption: yes || 'Yes'
      }
    },
    {
      letter: 'N',
      choice: {
        answerOption: no || 'No'
      }
    }
  ]

  const letters = []
  mappedChoices.map((item) => letters.push(item.letter))

  // [CLEAN FUNCTIONS]
  const onButtonClick = (choiceData) => {
    const { letter, choice } = choiceData
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.answerOption || '', letterKey: letter }
      const data = {
        question,
        answer
      }
      onClick && onClick(data)
    }
  }

  return (
    <Box display="block">
      {mappedChoices.map((item, index) => (
        <Box key={index} mb={2} mx={2}>
          <KeyBox
            isActive={buttonKey === item.letter}
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
