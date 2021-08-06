import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { Select } from 'antd'
import { DATE_CONDITION_RULES_VALUES } from '../../../../../constants/dateConditionRules'
import { StyledDatePicker, StyledSelect } from './PlainTextDateTemplate.style'
import { COLLECTIONS } from '../../../../../constants'
import useFunctions from '../../../../../hooks/useFunctions'
import moment from 'moment'
import { useTranslation } from '../../../../../context/Translation'

const { Option } = Select

const PlaneDateItem = (props) => {
  const {
    item,
    index,
    questionId,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  //[ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { rulePlaceholder } = useTranslation()

  //[COMPONENT STATE HOOKS]
  const [datePickerValue, setDatePickerValue] = useState(
    item?.answerOption ? moment(item?.answerOption) : ''
  )
  const [ruleSelectValue, setRuleSelectValue] = useState(
    item?.redirectConditionRule || rulePlaceholder || 'Select redirect rule'
  )

  //[CLEAN FUNCTIONS]
  const onRuleSelectValueChange = (selectValue = '') => {
    setRuleSelectValue(selectValue)

    // create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update conditionRule of certain question
    const isRuleChanged =
      updatedQuestionConfigurations[index].redirectConditionRule !== selectValue

    if (isRuleChanged) {
      updatedQuestionConfigurations[index].redirectConditionRule = selectValue
      //write new data to db
      setData(COLLECTIONS.QUESTIONS, questionId, {
        questionConfigurations: updatedQuestionConfigurations
      })
    }
  }

  const onDatePickerValueChange = (datePickerVal, stringDateValue = '') => {
    setDatePickerValue(datePickerVal || '')

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update answer option of certain question
    const isDateChanged =
      updatedQuestionConfigurations[index].answerOption !== stringDateValue

    if (isDateChanged) {
      updatedQuestionConfigurations[index].answerOption = stringDateValue
      //write new data to db
      setData(COLLECTIONS.QUESTIONS, questionId, {
        questionConfigurations: updatedQuestionConfigurations
      })
    }
  }

  useEffect(() => {
    setDatePickerValue(item?.answerOption ? moment(item?.answerOption) : '')
    setRuleSelectValue(
      item?.redirectConditionRule || rulePlaceholder || 'Select redirect rule'
    )
  }, [item, rulePlaceholder])

  return (
    <Row mb={2} key={index}>
      <Col cw={6} px={0}>
        <Row>
          <Col cw={6} px={0}>
            <StyledSelect
              showSearch
              allowClear
              value={
                ruleSelectValue || rulePlaceholder || 'Select redirect rule'
              }
              onChange={onRuleSelectValueChange}>
              {DATE_CONDITION_RULES_VALUES?.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col cw={6} pl={1} pr={2}>
            <StyledDatePicker
              value={datePickerValue}
              onChange={onDatePickerValueChange}
            />
          </Col>
        </Row>
      </Col>

      <Col cw={6} pr={0}>
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
PlaneDateItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}
export default PlaneDateItem
