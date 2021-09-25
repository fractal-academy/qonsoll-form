import React, { useState, useEffect } from 'react'
import { useTranslation } from '../../../../context/Translation'
import { Row, Col, Text, Switch, Select } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'

const maxRange = [...Array(10)].map((_, index) =>
  Object.create({ value: index + 1 })
)

function AmountOptionsCustomConfig() {
  // [CUSTOM_HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { questionConfigurationOptions } = useTranslation()

  // [COMPONENT_STATE_HOOKS]
  const [extendedSwitchValue, setExtendedSwitchValue] = useState(
    currentQuestion?.isExtended
  )

  // [CLEAN_FUNCTIONS]
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
  const extendedStateChange = (switchValue) => {
    setExtendedSwitchValue(!switchValue)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isExtended: switchValue }
    })
  }

  // [COMPUTED PROPERTIES]
  const questionConfigurations = currentQuestion?.questionConfigurations
  const defaultSelectValue = questionConfigurations?.length || maxRange[0]

  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setExtendedSwitchValue(currentQuestion?.isExtended)
  }, [currentQuestion])

  return (
    <>
      <Row noGutters mb={3} v="center" h="between">
        <Col v="center">
          <Text color="var(--qf-typography-subtitle-color)">
            {questionConfigurationOptions || 'Turn on extended options'}
          </Text>
        </Col>
        <Col cw="auto" v="center">
          {/* //// */}
          <Switch
            size="small"
            onChange={extendedStateChange}
            checked={extendedSwitchValue}
          />
        </Col>
      </Row>
      <Row noGutters mb={2} h="between">
        <Col v="center" mb={2}>
          <Text color="var(--qf-typography-subtitle-color)">
            {questionConfigurationOptions || 'Amount of options'}
          </Text>
        </Col>
        <Col cw="auto">
          <Select
            size="small"
            listHeight={160}
            width="60px"
            options={maxRange}
            defaultValue={defaultSelectValue}
            onChange={onRattingSelectChange}
          />
        </Col>
      </Row>
    </>
  )
}

export default AmountOptionsCustomConfig
