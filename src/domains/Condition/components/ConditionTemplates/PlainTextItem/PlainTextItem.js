import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../Question/components'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../../constants/planeTextStringConditionRules'
import { CustomInput, StyledSelect } from './PlainTextItem.styles'
import { COLLECTIONS } from '../../../../../constants'
import useFunctions from '../../../../../hooks/useFunctions'

const { Option } = Select

function PlaneTextItem(props) {
  const {
    item,
    index,
    questionId,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  //[COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(item?.answerOption)
  const [ruleSelectValue, setRuleSelectValue] = useState(
    item?.conditionRedirectRule
  )

  //[ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  //[CLEAR FUNCTIONS]
  const onInputValueChange = ({ target }) => {
    setInputValue(target.value)
  }

  const onRuleSelectValueChange = (selectValue) => {
    setRuleSelectValue(selectValue)

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update conditionRule of certain question
    updatedQuestionConfigurations[index].conditionRedirectRule = selectValue
    //write new data to db
    setData(COLLECTIONS.QUESTIONS, questionId, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  const onBlur = () => {
    //breack if value didn`t change
    if (questionConfigurations[index].answerOption === inputValue) return

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update answer option of certain question
    updatedQuestionConfigurations[index].answerOption = inputValue
    //write new data to db
    setData(COLLECTIONS.QUESTIONS, questionId, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  return (
    <Row noGutters mb={2} key={index}>
      <Col cw={6}>
        <Row noGutters width="100%">
          <Col cw={6}>
            <Box width="100%" mr={2}>
              <StyledSelect
                showSearch
                allowClear
                defaultValue={TEXT_CONDITION_RULES_VALUES[0]}
                value={ruleSelectValue}
                onChange={onRuleSelectValueChange}>
                {TEXT_CONDITION_RULES_VALUES.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </StyledSelect>
            </Box>
          </Col>
          <Col cw={6}>
            <Box width="100%" mr={4}>
              <CustomInput
                value={inputValue}
                onChange={onInputValueChange}
                onBlur={onBlur}
              />
            </Box>
          </Col>
        </Row>
      </Col>

      <Col cw={6}>
        <QuestionSelect
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
          index={index}
          questionList={questionList}
        />
      </Col>
    </Row>
  )
}
PlaneTextItem.propTypes = {
  questionOptions: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneTextItem
