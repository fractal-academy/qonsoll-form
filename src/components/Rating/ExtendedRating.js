import React, { useState } from 'react'
import useMedia from 'use-media'
import { message } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { Container, Box } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'
import { StyledRate } from './Rating.styles'
import { StarFilled } from '@ant-design/icons'
import { getQuestionAnswerFromContext } from '../../helpers'
import { useAnswersContext } from '../../context/Answers'
import { ChoiceEditableGroup } from '..'

function ExtendedRating(props) {
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
  const { requiredAnswerMessage } = useTranslation()
  const answersContext = useAnswersContext()
  const [selectedValue, setSelectedValue] = useState(0)

  //[ADDITIONAL HOOKS]
  const phoneSize = useMedia({ maxWidth: '430px' })
  const tabletSize = useMedia({ minWidth: '450px', maxWidth: '1050px' })

  // [COMPUTED PROPERTIES]
  const range = questionConfigurations?.map((el) => el?.answerOption)

  // [CLEAN FUNCTIONS]
  const onChange = (selectedStarsNumber) => {
    if (range.includes(selectedStarsNumber)) {
      const selectedStarData = questionConfigurations?.[selectedStarsNumber - 1]
      setSelectedValue(selectedStarsNumber)
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
            ? message.error(requiredAnswerMessage || 'Answer is required.')
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
      <>
        <Box mb={4}>
          <StyledRate
            value={selectedValue}
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
        </Box>
        <ChoiceEditableGroup />
      </>
    </Container>
  )
}

ExtendedRating.propTypes = {}

export { ExtendedRating }
