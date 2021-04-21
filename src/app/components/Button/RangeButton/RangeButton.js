import PropTypes from 'prop-types'
import './RangeButton.styles.css'
import { useState } from 'react'
import { Button } from 'app/components'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

function RangeButton(props) {
  const { from = 0, to = 0, onClick } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  useKeyPress(
    (event) => ![].includes(event.key),
    (event) => {
      if (event.type === 'keyup') {
        onButtonClick(event.key)
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [COMPUTED PROPERTIES]
  const range = Array(to - from + 1)
    .fill(0)
    .map((el, index) => from + index)

  // [CLEAN FUNCTIONS]
  const onButtonClick = (number) => {
    if (range.includes(Number(number))) {
      setButtonKey(number)

      console.log(`Choice ${number} was pressed`)
      onClick && onClick()
    }
  }

  return (
    <Box display="flex">
      {range.map((item) => (
        <Button
          key={item}
          onClick={() => onButtonClick(item)}
          buttonType="secondary"
          className={(Number(buttonKey) === item && 'active') || 'range'}>
          <b>{item}</b>
        </Button>
      ))}
    </Box>
  )
}

RangeButton.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired
}

export default RangeButton
