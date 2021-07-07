import React from 'react'
import PropTypes from 'prop-types'
import { CustomButton, CustomText } from './PlainShortTextStringTemplate.style'
import { PlaneTextItem } from '../PlainTextItem'
import { v4 as uuid } from 'uuid'

function PlaneShortTextStringTemplate(props) {
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
      answerOptionId: uuid(),
      redirectConditionRule: ''
    })
  }

  return (
    <>
      {questionConfigurations?.map((item, index) => (
        <PlaneTextItem
          index={index}
          questionId={id}
          item={item}
          key={index}
          questionConfigurations={questionConfigurations}
          questionList={questionList}
          addRedirectQuestion={addRedirectQuestion}
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
PlaneShortTextStringTemplate.propTypes = {
  questionOptions: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneShortTextStringTemplate
