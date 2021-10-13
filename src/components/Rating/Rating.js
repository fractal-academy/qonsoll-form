import { message } from 'antd'
import useMedia from 'use-media'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { TEXTINGS } from '../../constants'
import { StyledRate } from './Rating.styles'
import { StarFilled } from '@ant-design/icons'
import RatingExtension from './RatingExtension'
import { Container } from '@qonsoll/react-design'
import { useAnswersContext } from '../../context/Answers'
import { useTranslation } from '../../context/Translation'
import { getQuestionAnswerFromContext } from '../../helpers'

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
  const answersContext = useAnswersContext()
  const { requiredAnswerMessage } = useTranslation()
  const [selectedValue, setSelectedValue] = useState(0)
  const [radioChecked, setRadioChecked] = useState()
  const [checkboxChecked, setCheckboxChecked] = useState()

  //[ADDITIONAL HOOKS]
  const phoneSize = useMedia({ maxWidth: '430px' })
  const tabletSize = useMedia({ minWidth: '450px', maxWidth: '1050px' })

  // [COMPUTED PROPERTIES]
  const range = questionConfigurations?.map((el) => el?.answerOption)

  // [CLEAN FUNCTIONS]
  const onChange = (selectedStarsNumber) => {
    setRadioChecked(false)
    setCheckboxChecked(false)
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

      selectedStarsNumber && onClick
        ? setTimeout(onClick, 700, data)
        : onClick?.(data)
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
                requiredAnswerMessage || TEXTINGS.requiredAnswerMessage
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
    <Container display="grid">
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

      {question?.isExtended && (
        <RatingExtension
          onClick={onClick}
          question={question}
          isFormQuiz={isFormQuiz}
          radioChecked={radioChecked}
          checkboxChecked={checkboxChecked}
          setSelectedValue={setSelectedValue}
          isMultiple={question?.isMultiple}
        />
      )}
    </Container>
  )
}

CustomRating.propTypes = {
  onClick: PropTypes.func,
  tooltips: PropTypes.array,
  question: PropTypes.object,
  isFormQuiz: PropTypes.bool,
  allowClear: PropTypes.bool,
  currentSlide: PropTypes.number,
  answersScoreData: PropTypes.array
}

export { CustomRating }
