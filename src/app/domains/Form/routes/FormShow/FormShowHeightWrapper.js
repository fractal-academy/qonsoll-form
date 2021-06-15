import { Box } from '@qonsoll/react-design'
import { QuestionAdvancedView } from 'domains/Question/components'
import React from 'react'

const FormShowHeightWrapper = ({
  index,
  item,
  onClick,
  currentSlide,
  wrapperHeight
}) => {
  return (
    <Box key={index} height={wrapperHeight} overflowY="auto">
      <QuestionAdvancedView
        wrapperHeight={wrapperHeight}
        data={item}
        questionNumber={index + 1}
        onClick={onClick}
        currentSlide={currentSlide}
      />
    </Box>
  )
}

export default FormShowHeightWrapper
