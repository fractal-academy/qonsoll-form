import React from 'react'
import { Typography, Select } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import { useTranslation } from '../../../../context/Translation'

const { Text } = Typography
const { Option } = Select

const maxRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function AmountOptionsCustomConfig() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { questionConfigurationAmountOfOptions } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onRattingSelectChange = (amountOptions) => {
    const questionConfigurations = Array(amountOptions - 1 + 1)
      .fill(0)
      .map((el, index) => ({
        answerOption: 1 + index,
        redirectQuestion: '',
        redirectConditionRule: ''
      }))
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations }
    })
  }

  // [COMPUTED PROPERTIES]
  const questionConfigurations = currentQuestion?.questionConfigurations
  return (
    <Row noGutters mb={2} h="between">
      <Col v="center">
        <Text strong>
          {questionConfigurationAmountOfOptions || 'Amount of options '}
        </Text>
      </Col>
      <Col cw="auto" v="center">
        <Select
          defaultValue={questionConfigurations?.length || maxRange[0]}
          size="small"
          onChange={onRattingSelectChange}>
          {maxRange.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default AmountOptionsCustomConfig
