import React from 'react'
import { Typography, Select } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

const { Text } = Typography
const { Option } = Select

const opinionScaleTo = [5, 6, 7, 8, 9, 10]

function OpinionScaleCustomConfig() {
  // [ADDITIONAL_HOOKS]
  const { fromSetting, toSetting } = useTranslation()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const questionConfigurations = currentQuestion?.questionConfigurations
  // [CLEAN FUNCTIONS]
  const onSelectFromChange = (switchFromValue) => {
    const computedBtnProps = questionConfigurations
      ? { ...questionConfigurations, from: switchFromValue }
      : { from: switchFromValue }

    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: computedBtnProps }
    })
  }
  const onSelectToChange = (switchToValue) => {
    const computedBtnProps = questionConfigurations
      ? { ...questionConfigurations, to: switchToValue }
      : { to: switchToValue }

    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations: computedBtnProps }
    })
  }
  return (
    <Row noGutters mb={2}>
      <Col cw="auto" mr={3}>
        <Text strong>{fromSetting || 'From'}</Text>
      </Col>
      <Col>
        <Select
          defaultValue={questionConfigurations?.from || 0}
          size="small"
          onChange={onSelectFromChange}>
          <Option value="0">0</Option>
          <Option value="1">1</Option>
        </Select>
      </Col>
      <Col v="center" cw="auto" mr={3}>
        <Text strong>{toSetting || 'to'}</Text>
      </Col>
      <Col cw="auto">
        <Select
          defaultValue={questionConfigurations?.to || opinionScaleTo[0]}
          size="small"
          onChange={onSelectToChange}>
          {opinionScaleTo.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default OpinionScaleCustomConfig
