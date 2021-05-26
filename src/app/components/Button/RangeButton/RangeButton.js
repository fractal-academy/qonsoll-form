import { Button } from 'antd'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

const StyledRangeButton = styled(Button)`
  width: 65px;
  height: 65px;
  margin-left: 5px;
  border-color: ${theme.color.primary.default};
  background-color: ${(props) =>
    props.isActive
      ? theme.color.primary.default
      : theme.color.primary.t.lighten5};
  color: ${(props) =>
    props.isActive ? theme.color.white.default : theme.color.primary.default};

  &:hover {
    color: ${(props) => props.isActive && theme.color.white.default};
    border-color: ${(props) => props.isActive && theme.color.primary.default};
    background-color: ${(props) =>
      props.isActive
        ? theme.color.primary.t.lighten1
        : theme.color.primary.t.lighten3};
  }
`

function RangeButton(props) {
  const { from, to, onClick, currentSlide, order } = props

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
    if (range.includes(Number(number)) && currentSlide === order) {
      setButtonKey(number)
      onClick && onClick()
    }
  }

  return (
    <Box display="flex">
      {range.map((item) => (
        <StyledRangeButton
          key={item}
          onClick={() => onButtonClick(item)}
          isActive={Number(buttonKey) === item}>
          {item}
        </StyledRangeButton>
      ))}
    </Box>
  )
}

RangeButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired
}
RangeButton.defaultProps = {
  from: 0,
  to: 0
}

export default RangeButton
