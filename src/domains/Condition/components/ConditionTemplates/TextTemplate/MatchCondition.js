import { Col, Input, Option, Row, Select } from '@qonsoll/react-design'
import React, { useEffect, useState } from 'react'

import { COLLECTIONS } from '../../../../../constants'
import PropTypes from 'prop-types'
import { QuestionSelect } from '../../../../Question/components'
import { StyledDatePicker } from './TextTemplate.styles'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../../constants/planeTextStringConditionRules'
import moment from 'moment'
import useFunctions from '../../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

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
  const { t } = useTranslations()

  //[COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState('')
  const [datePickerValue, setDatePickerValue] = useState('')
  const [ruleSelectValue, setRuleSelectValue] = useState('')

  //[CLEAR FUNCTIONS]
  const onInputValueChange = ({ target }) => setInputValue(target.value)
  const onDatePickerValueChange = (datePickerVal) => {
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
  useEffect(() => {
    item?.answerOption && setInputValue(item?.answerOption)
    item?.answerOption && setDatePickerValue(moment(item?.answerOption))
    item?.redirectConditionRule &&
      setRuleSelectValue(item?.redirectConditionRule)
  }, [item])

  return (
    <Row mb="16px" key={index}>
      <Col cw={3} pr="8px" pl={0}>
        <Select
          allowClear
          placeholder={t('Select redirect rule')}
          value={ruleSelectValue || t('Select redirect rule')}
          onChange={onRuleSelectValueChange}>
          {TEXT_CONDITION_RULES_VALUES?.map((item, index) => (
            <Option key={index}>{t(item)}</Option>
          ))}
        </Select>
      </Col>
      <Col cw={3} pl={0} pr="8px">
        {handlesDate ? (
          <StyledDatePicker
            value={datePickerValue}
            onChange={onDatePickerValueChange}
          />
        ) : (
          <Input
            placeholder={t('Enter value')}
            onChange={onInputValueChange}
            value={inputValue}
            maxLength={250}
            onBlur={onBlur}
          />
        )}
      </Col>
      <Col cw={6} pr={0} pl="8px">
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
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func,
  questionConfigurations: PropTypes.array,
  handlesDate: PropTypes.bool
}

export default MatchCondition
