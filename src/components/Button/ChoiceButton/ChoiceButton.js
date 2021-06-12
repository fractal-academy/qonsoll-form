import PropTypes from 'prop-types'
import { KeyBox } from '../../../components'
import { useKeyPress } from '@umijs/hooks'
import { Row, Col } from '@qonsoll/react-design'
import React, { useMemo, useState } from 'react'
import useMedia from 'use-media'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, hasImages, currentSlide, question } = props
  const { order } = question

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
        let index = key.charCodeAt(0) - startLetter

        onButtonClick({ letter: key, choice: choices[index] })
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )
  const phoneSize = useMedia({ maxWidth: '500px' })

  // [CLEAN FUNCTIONS]
  const onButtonClick = (props) => {
    const { letter, choice } = props

    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      const answer = { value: choice?.name || '', letterKey: letter }
      //if picture choice add field with image link
      const data = {
        question,
        answer: hasImages ? answer : { ...answer, image: choice?.image || '' }
      }

      onClick && onClick(data)
    }
  }

  return (
    <Row noGutters h={phoneSize && 'center'}>
      {mappedChoices?.map((item, index) => (
        <Col cw={hasImages ? (phoneSize ? '10' : 'auto') : '12'}>
          <KeyBox
            key={index}
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
