import moment from 'moment'
import PropTypes from 'prop-types'
import { Select as AntSelect } from 'antd'
import React, { useState, useEffect } from 'react'
import { COLLECTIONS, TEXTINGS } from '../../../../../constants'
import { StyledDatePicker } from './TextTemplate.styles'
import useFunctions from '../../../../../hooks/useFunctions'
import { Row, Col, Input, Select, Text } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../Question/components'
import { useTranslation } from '../../../../../context/Translation'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../../constants/planeTextStringConditionRules'

function MatchCondition(props) {
  const {
    item,
    index,
    questionId,
    handlesDate,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  //[ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const {
    conditionRedirectPlaceholder,
    conditionIsEqual,
    conditionIsntEqual,
    conditionBegins,
    conditionEnds,
    conditionContains,
    conditionDoesntContains
  } = useTranslation()

  //[COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(item?.answerOption)
  const [datePickerValue, setDatePickerValue] = useState(
    item?.answerOption ? moment(item?.answerOption) : ''
  )
  const [ruleSelectValue, setRuleSelectValue] = useState(
    item?.redirectConditionRule ||
      conditionRedirectPlaceholder ||
      TEXTINGS.conditionRedirectPlaceholder
  )

  //[CLEAR FUNCTIONS]
  const onInputValueChange = ({ target }) => {
    setInputValue(target.value)
  }
  const onDatePickerValueChange = (datePickerVal, stringDateValue = '') => {
    setDatePickerValue(datePickerVal || '')
  }

  const onRuleSelectValueChange = (selectValue) => {
    setRuleSelectValue(selectValue || '')

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update conditionRule of certain question
    const isRuleChanged =
      updatedQuestionConfigurations[index].redirectConditionRule !== selectValue

    if (isRuleChanged) {
      updatedQuestionConfigurations[index].redirectConditionRule =
        selectValue || ''
      //write new data to db
      setData(COLLECTIONS.QUESTIONS, questionId, {
        questionConfigurations: updatedQuestionConfigurations
      })
    }
  }

  const onBlur = () => {
    //break if value didn't change
    if (questionConfigurations[index].answerOption === inputValue) return

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update answer option of certain question
    updatedQuestionConfigurations[index].answerOption = inputValue || ''
    //write new data to db
    setData(COLLECTIONS.QUESTIONS, questionId, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  // [COMPUTED PROPERTIES]
  const translatedSelectOptions = [
    conditionIsEqual,
    conditionIsntEqual,
    conditionBegins,
    conditionEnds,
    conditionContains,
    conditionDoesntContains
  ]
  const matchRulesSelctOptions = translatedSelectOptions.filter(
    (item) => !!item === true
  ).length
    ? translatedSelectOptions
    : TEXT_CONDITION_RULES_VALUES

  useEffect(() => {
    setInputValue(item?.answerOption || '')
    setDatePickerValue(item?.answerOption ? moment(item?.answerOption) : '')
    setRuleSelectValue(
      item?.redirectConditionRule ||
        conditionRedirectPlaceholder ||
        TEXTINGS.conditionRedirectPlaceholder
    )
  }, [item, conditionRedirectPlaceholder])

  return (
    <Row mb={2} key={index}>
      <Col cw={3} pr={2} pl={0}>
        <Select
          showSearch
          allowClear
          value={
            ruleSelectValue ||
            conditionRedirectPlaceholder ||
            TEXTINGS.conditionRedirectPlaceholder
          }
          onChange={onRuleSelectValueChange}>
          {matchRulesSelctOptions.map((item, index) => (
            <AntSelect.Option key={index}>
              <Text>{item}</Text>
            </AntSelect.Option>
          ))}
        </Select>
      </Col>
      <Col cw={3} pl={0} pr={2}>
        {handlesDate ? (
          <StyledDatePicker
            value={datePickerValue}
            onChange={onDatePickerValueChange}
          />
        ) : (
          <Input
            placeholder={TEXTINGS.conditionTextInputPlaceholder}
            onChange={onInputValueChange}
            value={inputValue}
            onBlur={onBlur}
          />
        )}
      </Col>
      <Col cw={6} pr={0} pl={2}>
        <QuestionSelect
          index={index}
          questionList={questionList}
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
        />
      </Col>
    </Row>
  )
}

MatchCondition.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  questionId: PropTypes.string,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array
}

export default MatchCondition
