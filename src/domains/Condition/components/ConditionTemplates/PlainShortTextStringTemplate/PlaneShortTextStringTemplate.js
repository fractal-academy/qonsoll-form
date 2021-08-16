import React from 'react'
import PropTypes from 'prop-types'
import { CustomButton, CustomText } from './PlainShortTextStringTemplate.style'
import { PlaneTextItem } from '../PlainTextItem'
import { v4 as uuid } from 'uuid'

function PlaneShortTextStringTemplate(props) {
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
  id: PropTypes.string.isRequired,
  addCondition: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}
export default PlaneShortTextStringTemplate
