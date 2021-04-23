import PropTypes from 'prop-types'
import { KeyBox, ImageKeyBox } from 'app/components'
import { useMemo, useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, hasImages } = props

  console.log(choices)

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
      {mappedChoices.map((item, index) =>
        hasImages ? (
          <ImageKeyBox
            key={index}
            item={item}
            buttonKey={buttonKey}
            onButtonClick={onButtonClick}
            isActive={buttonKey === item.letter}
          />
        ) : (
          <KeyBox
            key={index}
            item={item}
            buttonKey={buttonKey}
            onButtonClick={onButtonClick}
            isActive={buttonKey === item.letter}
          />
        )
      )}
    </Box>
  )
}

ChoiceButton.propTypes = {
  choices: PropTypes.array,
  onClick: PropTypes.func
}

export default ChoiceButton
