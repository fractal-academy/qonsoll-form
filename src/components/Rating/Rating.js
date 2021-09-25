import useMedia from 'use-media'
import { message, Radio } from 'antd'
import React, { useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { StyledRate } from './Rating.styles'
import { StarFilled } from '@ant-design/icons'
import { Container, Box, Text } from '@qonsoll/react-design'
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
  const { requiredAnswerMessage, checkboxIrrelevant, checkboxNonPreferred } =
    useTranslation()
  const [selectedValue, setSelectedValue] = useState(0)

  //[ADDITIONAL HOOKS]
  const phoneSize = useMedia({ maxWidth: '430px' })
  const tabletSize = useMedia({ minWidth: '450px', maxWidth: '1050px' })

  // [COMPUTED PROPERTIES]
  const range = questionConfigurations?.map((el) => el?.answerOption)
  const irrelevantCheckboxLabel =
    checkboxIrrelevant || 'This is not relevant to me'
  const notPreferredCheckboxLabel =
    checkboxNonPreferred || 'I prefer not to answer'

  // [CLEAN FUNCTIONS]
  const onChange = (selectedStarsNumber) => {
    if (range.includes(selectedStarsNumber)) {
      const selectedStarData = questionConfigurations?.[selectedStarsNumber - 1]
      setSelectedValue(selectedStarsNumber)
      //answer score if configured
      console.log(selectedStarData)
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

      onClick && setTimeout(onClick, 700, data)
    }
  }

  const onRadioChange = (option) => {
    const score = ''

    const data = {
      question,
      answer: { value: option.target.value || '' },
      answerId: '1',
      answerScore: isFormQuiz ? score : ''
    }

    // if the data is sent we delay and animate the selected value, else - just go to next question
    if (!!option) {
      onClick && setTimeout(onClick, 700, data)
    } else {
      onClick?.(data)
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
        <Radio.Group onChange={onRadioChange}>
          <Box mt={4}>
            <Radio value={notPreferredCheckboxLabel} disabled={!onClick}>
              <Text color="var(--qf-typography-subtitle-color)" variant="body1">
                {notPreferredCheckboxLabel}
              </Text>
            </Radio>
          </Box>
          <Box mt={2}>
            <Radio value={irrelevantCheckboxLabel} disabled={!onClick}>
              <Text color="var(--qf-typography-subtitle-color)" variant="body1">
                {irrelevantCheckboxLabel}
              </Text>
            </Radio>
          </Box>
        </Radio.Group>
      )}
    </Container>
  )
}

CustomRating.propTypes = {}

export { CustomRating }
