import React from 'react'
import useMedia from 'use-media'
import { message } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { Container } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'
import { StyledRate } from './Rating.styles'
import { StarFilled } from '@ant-design/icons'
import { getQuestionAnswerFromContext } from '../../helpers'
import { useAnswersContext } from '../../context/Answers'

function CustomRating(props) {
  const { allowClear, tooltips, onClick, question, currentSlide } = props
  const { questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  const answersContext = useAnswersContext()

  //[ADDITIONAL HOOKS]
  const phoneSize = useMedia({ maxWidth: '430px' })
  const tabletSize = useMedia({ minWidth: '450px', maxWidth: '1050px' })

  // [COMPUTED PROPERTIES]
  const range = questionConfigurations?.map((el) => el?.answerOption)

  // [CLEAN FUNCTIONS]
  const onChange = (selectedStarsNumber) => {
    if (range.includes(selectedStarsNumber)) {
      const data = {
        question,
        answer: { value: selectedStarsNumber },
        answerId:
          questionConfigurations?.[selectedStarsNumber - 1]?.answerOptionId ||
          ''
      }

      // if the data is sent we delay and animate the selected value, else - just go to next question
      if (!!selectedStarsNumber) {
        onClick && setTimeout(onClick, 700, data)
      } else {
        onClick?.(data)
      }
    }
  }

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) =>
      (![].includes(event.key) || event.keyCode === 13) &&
      currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        if (event.keyCode === 13) {
          const questionAnswer = getQuestionAnswerFromContext(
            answersContext,
            question
          )
          const answerData = questionAnswer || {
            question,
            answer: { value: '' }
          }

          question?.isRequired && !questionAnswer
            ? message.error(
                answerRequiredMessageError ||
                  'It`s required question, please answer'
              )
            : onClick?.(answerData)
        } else {
          onChange(Number(event.key))
        }
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
        tooltips={tooltips}
        onChange={onChange}
        disabled={!onClick}
        phoneSize={phoneSize}
        allowClear={allowClear}
        tabletSize={tabletSize}
        count={questionConfigurations?.length}
        character={<StarFilled onMouseDown={(e) => e.preventDefault()} />}
      />
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
