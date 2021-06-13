import React, { useState, useEffect } from 'react'
import { Typography, Switch } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from 'app/constants'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'
import {
  OpinionScaleCustomConfig,
  RatingCustomConfig
} from 'domains/Question/components/QuestionCustomConfigurations'

const { Text } = Typography

function QuestionConfigurationMenu() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  //[ADDITIONAL HOOKS]
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
          <Text strong>Required</Text>
        </Col>
        <Col cw="auto" px={2}>
          <Switch
            size="small"
            checked={requiredSwitchValue}
            onChange={requireStateChange}
          />
        </Col>
      </Row>
      {currentQuestion.questionType === QUESTION_TYPES.OPINION_SCALE && (
        <Row noGutters>
          <Col>
            <OpinionScaleCustomConfig />
          </Col>
        </Row>
      )}
      {currentQuestion.questionType === QUESTION_TYPES.RATING && (
        <Row noGutters>
          <Col>
            <RatingCustomConfig />
          </Col>
        </Row>
      )}
    </Box>
  )
}

export default QuestionConfigurationMenu
