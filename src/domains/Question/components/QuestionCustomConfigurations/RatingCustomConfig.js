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

const maxRange = [...Array(10)].map((_, index) => index + 1)

function AmountOptionsCustomConfig() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { questionConfigurationAmountOfOptions } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onRattingSelectChange = (amountOptions) => {
    const questionConfigurations = Array(amountOptions - 1 + 1)
      .fill(0)
      ?.map((_, index) => ({
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
  const defaultSelectValue = questionConfigurations?.length || maxRange[0]

  return (
    <Row noGutters mb={2} h="between">
      <Col v="center">
        <Text strong>
          {questionConfigurationAmountOfOptions || 'Amount of options '}
        </Text>
      </Col>
      <Col cw="auto" v="center">
        <Select
          size="small"
          listHeight={160}
          style={{ width: '60px' }}
          defaultValue={defaultSelectValue}
          onChange={onRattingSelectChange}>
          {maxRange?.map((item) => (
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
