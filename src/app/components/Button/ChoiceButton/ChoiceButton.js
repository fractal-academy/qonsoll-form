import PropTypes from 'prop-types'
import { KeyBox } from 'app/components'
import { useMemo, useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

let startLetter = 65

function ChoiceButton(props) {
  const { choices } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  const mappedChoises = useMemo(
    () =>
      choices.map((el, index) => ({
        letter: String.fromCharCode(startLetter + index),
        name: el
      })),
    [choices]
  )

  const letters = useMemo(
    () => (mappedChoises ? mappedChoises.map(({ letter }) => letter) : []),
    [mappedChoises]
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = (letter) => {
    if (letters.includes(letter)) {
      setButtonKey(letter)

      console.log(`Choice ${letter} was pressed`)
    }
  }

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

  return (
    <Box display="block">
      {mappedChoises.map((item, index) => (
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
  conditions: PropTypes.array,
  choices: PropTypes.array
}

export default ChoiceButton
