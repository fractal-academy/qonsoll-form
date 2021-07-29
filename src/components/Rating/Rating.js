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
  const {
    onClick,
    tooltips,
    question,
    isFormQuiz,
    allowClear,
    currentSlide,
    answersScoreData
  } = props
  const { questionConfigurations } = question

  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()
  const answersContext = useAnswersContext()

  //[ADDITIONAL HOOKS]
  const phoneSize = useMedia({ maxWidth: '430px' })
  const tabletSize = useMedia({ minWidth: '450px', maxWidth: '1050px' })

  // [CLEAN FUNCTIONS]
  const onChange = (selectedStarsNumber) => {
    const selectedStarData = questionConfigurations?.[selectedStarsNumber - 1]
    //answer score if configured
    const score =
      answersScoreData?.find(
        (item) => item?.answerOptionId === selectedStarData?.answerOptionId
      )?.score || ''

    const data = {
      question,
      answer: { value: selectedStarsNumber },
      answerId: selectedStarData?.answerOptionId || '',
      answerScore: isFormQuiz ? score : ''
    }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (!!selectedStarsNumber) {
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
