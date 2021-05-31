import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../../constants/planeTextStringConditionRules'
import {
  CustomButton,
  CustomInput,
  CustomText,
  StyledSelect
} from './PlainLongTextStringTemplate.style'

const { Option } = Select

function PlaneLongTextStringTemplate(props) {
  const { answers, addCondition, questionList, addRedirectQuestion } = props

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({ name: '', redirectQuestion: null })
  }

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <StyledSelect
              showSearch
              allowClear
              defaultValue={TEXT_CONDITION_RULES_VALUES[0]}>
              {TEXT_CONDITION_RULES_VALUES.map((item, index) => (
                <Option key={index} value={item} onClick={() => {}}>
                  {item}
                </Option>
              ))}
            </StyledSelect>

            <CustomInput />
          </Col>

          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
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
  answers: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneLongTextStringTemplate
