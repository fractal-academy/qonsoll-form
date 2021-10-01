import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'
import { QuestionAdvancedView } from '../../../Question/components'

function FormShowHeightWrapper(props) {
  const {
    index,
    onClick,
    question,
    isFormQuiz,
    currentSlide,
    wrapperHeight,
    answersScoreData,
    containWelcomeScreen
  } = props

  //[COMPUTED PROPERTIES]
  const questionNumber = containWelcomeScreen ? index : index + 1

  return (
    <Box height={wrapperHeight} overflowY="auto" overflowX="hidden">
      <QuestionAdvancedView
        data={question}
        onClick={onClick}
        isFormQuiz={isFormQuiz}
        currentSlide={currentSlide}
        questionNumber={questionNumber}
        answersScoreData={answersScoreData}
      />
    </Box>
  )
}

FormShowHeightWrapper.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  question: PropTypes.object,
  isFormQuiz: PropTypes.bool,
  currentSlide: PropTypes.number,
  wrapperHeight: PropTypes.number,
  answersScoreData: PropTypes.array,
  containWelcomeScreen: PropTypes.bool
}

export default FormShowHeightWrapper
