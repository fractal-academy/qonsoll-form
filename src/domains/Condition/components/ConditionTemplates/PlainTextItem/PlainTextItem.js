import { Select } from 'antd'
import PropTypes from 'prop-types'
import { Col, Row } from '@qonsoll/react-design'
import React, { useState, useEffect } from 'react'
import { COLLECTIONS } from '../../../../../constants'
import useFunctions from '../../../../../hooks/useFunctions'
import { QuestionSelect } from '../../../../Question/components'
import { CustomInput, StyledSelect } from './PlainTextItem.styles'
import { useTranslation } from '../../../../../context/Translation'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../../constants/planeTextStringConditionRules'

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

  //[ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { conditionRedirectRulePlaceholder } = useTranslation()

  //[COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(item?.answerOption)
  const [ruleSelectValue, setRuleSelectValue] = useState(
    item?.redirectConditionRule ||
      conditionRedirectRulePlaceholder ||
      'Select redirect rule'
  )

  //[CLEAR FUNCTIONS]
  const onInputValueChange = ({ target }) => {
    setInputValue(target.value)
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
    //breack if value didn`t change
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

  useEffect(() => {
    setInputValue(item?.answerOption || '')
    setRuleSelectValue(
      item?.redirectConditionRule ||
        conditionRedirectRulePlaceholder ||
        'Select redirect rule'
    )
  }, [item, conditionRedirectRulePlaceholder])

  return (
    <Row mb={2} key={index}>
      <Col cw={6} px={0}>
        <Row>
          <Col cw={6} px={0}>
            <StyledSelect
              showSearch
              allowClear
              value={
                ruleSelectValue ||
                conditionRedirectRulePlaceholder ||
                'Select redirect rule'
              }
              onChange={onRuleSelectValueChange}>
              {TEXT_CONDITION_RULES_VALUES?.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col cw={6} pl={1} pr={2}>
            <CustomInput
              placeholder="Enter value"
              value={inputValue}
              onChange={onInputValueChange}
              onBlur={onBlur}
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
PlaneTextItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  addCondition: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  questionConfigurations: PropTypes.array.isRequired
}
export default PlaneTextItem
