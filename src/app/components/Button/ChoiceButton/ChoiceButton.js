import PropTypes from 'prop-types'
import { KeyBox } from 'app/components'
import { useMemo, useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, data } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  const mappedChoices = useMemo(
    () =>
      choices.map((el, index) => ({
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
    if (letters.includes(letter)) {
      setButtonKey(letter)
      onClick && onClick()

      console.log(`Choice ${letter} was pressed`)
    }
  }

  return (
    <Box display="block">
      {mappedChoices.map((item, index) => (
        <Box key={index} mb={2}>
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

ChoiceButton.propTypes = {
  choices: PropTypes.array
}

export default ChoiceButton
