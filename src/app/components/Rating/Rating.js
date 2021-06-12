import React from 'react'
import { Rate, message } from 'antd'
import styled from 'styled-components'
import { Container } from '@qonsoll/react-design'
import typeformTheme from 'app/styles/theme'
import { useKeyPress } from '@umijs/hooks'

const StyledRate = styled(Rate)`
  ${({ theme }) => `
  &.ant-rate {
    font-size: 40px;
    color: ${
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default
    };
  }
`}
`
function CustomRating(props) {
  const { allowClear, tooltips, onClick, question, currentSlide } = props
  const { questionConfigurations } = question

  // [CLEAN FUNCTIONS]
  const onChange = (value) => {
    const data = { question, answer: { value } }

    onClick && onClick(data)
  }

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        console.log('rate')
        !question?.isRequired
          ? onClick && onClick()
          : message.error('It`s required question, please answer')
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <Container>
      <StyledRate
        autoFocus={false}
        count={questionConfigurations?.starsAmount}
        allowClear={allowClear}
        tooltips={tooltips}
        onChange={onChange}
      />
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
