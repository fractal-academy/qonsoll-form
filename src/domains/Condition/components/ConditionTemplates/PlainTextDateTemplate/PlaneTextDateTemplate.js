import React from 'react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import PlaneDateItem from './PlainDateItem'
import { CustomButton, CustomText } from './PlainTextDateTemplate.style'

function PlaneTextDateTemplate(props) {
  const {
    id,
    addCondition,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({
      answerOption: '',
      redirectQuestion: '',
      answerOptionId: uuid(),
      redirectConditionRule: ''
    })
  }
  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <PlaneDateItem
          key={index}
          item={item}
          index={index}
          questionId={id}
          questionList={questionList}
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
        />
      ))}
      <CustomButton
        size="medium"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}>
        <CustomText strong>+ Add condition</CustomText>
      </CustomButton>
    </>
  )
}

PlaneTextDateTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  addCondition: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}

export default PlaneTextDateTemplate
