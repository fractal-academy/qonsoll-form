import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { QuestionAdvancedView } from '../../../Question/components'
import React from 'react'

function FormShowHeightWrapper(props) {
  const {
    index,
    onClick,
    question,
    isFormQuiz,
    currentSlide,
    submitLoading,
    wrapperHeight,
    answersScoreData,
    containWelcomeScreen,
    preventFirebaseUsage
  } = props

  //[COMPUTED PROPERTIES]
  const questionNumber = containWelcomeScreen ? index : index + 1

  return (
    <Box height={wrapperHeight} overflowY="auto" overflowX="hidden">
      <QuestionAdvancedView
        data={question}
        onClick={onClick}
        submitLoading={submitLoading}
        isFormQuiz={isFormQuiz}
        currentSlide={currentSlide}
        questionNumber={questionNumber}
        answersScoreData={answersScoreData}
        preventFirebaseUsage={preventFirebaseUsage}
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
  containWelcomeScreen: PropTypes.bool,
  preventFirebaseUsage: PropTypes.bool,
  submitLoading: PropTypes.bool
}

export default FormShowHeightWrapper
