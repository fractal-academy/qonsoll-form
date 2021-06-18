import { Typography, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import { AmountOptionsCustomConfig } from '../../../../domains/Question/components/QuestionCustomConfigurations'

const { Text } = Typography

function QuestionConfigurationMenu() {
  // [ADDITIONAL_HOOKS]
  const { requiredSwitcher } = useTranslation()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT_STATE_HOOKS]
  const [requiredSwitchValue, setRequiredSwitchValue] = useState(
    currentQuestion?.isRequired
  )

  // [CLEAN FUNCTIONS]
  const requireStateChange = (switchValue) => {
    setRequiredSwitchValue(!switchValue)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isRequired: switchValue }
    })
  }

  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setRequiredSwitchValue(currentQuestion?.isRequired)
  }, [currentQuestion])

  return (
    <Box px={3} pt={2} h="between">
      <Row mb={3} noGutters v="center">
        <Col v="center">
          <Text strong>{requiredSwitcher || 'Required'}</Text>
        </Col>
        <Col cw="auto" px={2}>
          <Switch
            size="small"
            onChange={requireStateChange}
            checked={requiredSwitchValue}
          />
        </Col>
      </Row>
      {[QUESTION_TYPES.OPINION_SCALE, QUESTION_TYPES.RATING].includes(
        currentQuestion.questionType
      ) && <AmountOptionsCustomConfig />}
    </Box>
  )
}

export default QuestionConfigurationMenu
