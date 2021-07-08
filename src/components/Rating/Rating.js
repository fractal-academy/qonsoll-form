import React from 'react'
import { Rate, message } from 'antd'
import styled from 'styled-components'
import { Container } from '@qonsoll/react-design'
import typeformTheme from '../../../styles/theme'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'

const StyledRate = styled(Rate)`
  &.ant-rate {
    font-size: 40px;
    color: ${({ theme }) =>
      theme?.color?.primary?.default || typeformTheme?.color?.primary?.default};
  }
`
function CustomRating(props) {
  const { allowClear, tooltips, onClick, question, currentSlide } = props
  const { questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()

  //[COMPONENT STATE HOOKS]

  // [CLEAN FUNCTIONS]
  const onChange = (value) => {
    const data = { question, answer: { value } }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (!!value) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
    }
  }

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        !question?.isRequired
          ? onChange?.('')
          : message.error(
              answerRequiredMessageError ||
                'It`s required question, please answer'
            )
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
        count={questionConfigurations?.length}
        allowClear={allowClear}
        tooltips={tooltips}
        onChange={onChange}
        disabled={!onClick}
      />
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
