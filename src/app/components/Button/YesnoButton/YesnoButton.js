import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { KeyBox } from 'app/components'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

function YesnoButton(props) {
  const { onClick, currentSlide, question } = props
  const { order } = question
  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [COMPUTED PROPERTIES]
  const mappedChoices = [
    {
      letter: 'Y',
      choice: {
        name: 'Yes'
      }
    },
    {
      letter: 'N',
      choice: {
        name: 'No'
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
      const answer = { value: choice?.name || '', letterKey: letter }
      const data = {
        question,
        answer
      }
      onClick && onClick(data)

      console.log(`${letter} was pressed`)
    }
  }

  useKeyPress(
    (event) => ![].includes(event.key),
    (event) => {
      if (event.type === 'keyup') {
        const key = `${event.key}`.toUpperCase()
        let currentChoice = (key === 'Y' && 'Yes') || 'No'
        onButtonClick({ letter: key, choice: currentChoice })
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

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
