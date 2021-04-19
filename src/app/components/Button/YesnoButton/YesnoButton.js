import PropTypes from 'prop-types'
import { KeyBox } from 'app/components'
import { useKeyPress } from '@umijs/hooks'
import { useEffect, useState } from 'react'
import { Box } from '@qonsoll/react-design'
// import { useTranslation } from 'react-i18next'

function YesnoButton(props) {
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

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
  const onButtonClick = (letter) => {
    if (letters.includes(letter)) {
      setButtonKey(letter)

      console.log(`${letter} was pressed`)
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

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

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

YesnoButton.propTypes = {}

export default YesnoButton
