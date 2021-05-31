import PropTypes from 'prop-types'
import { KeyBox } from '../../../components'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'
import React, { useMemo, useState } from 'react'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, hasImages, currentSlide, order, id } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

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
    () => (mappedChoices ? mappedChoices.map(({ letter }) => letter) : []),
    [mappedChoices]
  )
  useKeyPress(
    (event) => ![].includes(event.key),
    (event) => {
      if (event.type === 'keyup') {
        const key = `${event.key}`.toUpperCase()
        onButtonClick(key)
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = (letter) => {
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const data = { questionId: id, answer: letter }

      onClick && onClick(data)
    }
  }

  return (
    <Box display="block">
      {mappedChoices?.map((item, index) => (
        <KeyBox
          key={index}
          item={item}
          hasImages={hasImages}
          buttonKey={buttonKey}
          onButtonClick={onButtonClick}
          isActive={buttonKey === item.letter}
        />
      ))}
    </Box>
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
