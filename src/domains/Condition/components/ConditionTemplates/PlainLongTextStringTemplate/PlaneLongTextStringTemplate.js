import React from 'react'
import PropTypes from 'prop-types'
import { Row } from '@qonsoll/react-design'
import { CustomButton, CustomText } from './PlainLongTextStringTemplate.style'
import { PlaneTextItem } from '../PlainTextItem'

function PlaneLongTextStringTemplate(props) {
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
        <PlaneTextItem
          index={index}
          item={item}
          questionId={id}
          key={index}
          questionConfigurations={questionConfigurations}
          questionList={questionList}
          addRedirectQuestion={addRedirectQuestion}
        />
      ))}
      <Row>
        <CustomButton size="medium" onClick={onClick}>
          <CustomText strong>+ Add condition</CustomText>
        </CustomButton>
      </Row>
    </>
  )
}
PlaneLongTextStringTemplate.propTypes = {
  questionOptions: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneLongTextStringTemplate
