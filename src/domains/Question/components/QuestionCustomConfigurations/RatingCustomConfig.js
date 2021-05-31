import React from 'react'
import { Typography, Select } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

const { Text } = Typography
const { Option } = Select

const rattingRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function RatingCustomConfig() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  // [CLEAN FUNCTIONS]
  const onRattingSelectChange = (starsAmount) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: { starsAmount } }
    })
  }
  // [COMPUTED PROPERTIES]
  const questionConfigurations = currentQuestion?.questionConfigurations
  return (
    <Row noGutters mb={2}>
      <Col>
        <Text strong>Amount of stars</Text>
      </Col>
      <Col cw="auto">
        <Select
          defaultValue={questionConfigurations?.starsAmount || rattingRange[0]}
          size="small"
          onChange={onRattingSelectChange}>
          {rattingRange.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default RatingCustomConfig
