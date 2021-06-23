import React from 'react'
import PropTypes from 'prop-types'
import { CustomButton, CustomText } from './PlainTextDateTemplate.style'
import PlaneDateItem from './PlainDateItem'

function PlaneTextDateTemplate(props) {
  const {
    id,
    questionConfigurations,
    addCondition,
    questionList,
    addRedirectQuestion
  } = props

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({
      answerOption: '',
      redirectQuestion: '',
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
      <CustomButton size="medium" onClick={onClick}>
        <CustomText strong>+ Add condition</CustomText>
      </CustomButton>
    </>
  )
}

PlaneTextDateTemplate.propTypes = {
  questionOptions: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default PlaneTextDateTemplate
