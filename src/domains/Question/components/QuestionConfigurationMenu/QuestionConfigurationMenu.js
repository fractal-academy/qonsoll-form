import { Box, Col, Row, Switch, Text } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import React, { useEffect, useState } from 'react'

import { AmountOptionsCustomConfig } from '../../../../domains/Question/components/QuestionCustomConfigurations'
import { QUESTION_TYPES } from '../../../../constants'
import { useTranslations } from '@qonsoll/translation'

function QuestionConfigurationMenu() {
  // [CUSTOM_HOOKS]
  const { t } = useTranslations()
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT_STATE_HOOKS]
  const [requiredSwitchValue, setRequiredSwitchValue] = useState(
    currentQuestion?.isRequired
  )
  const [isVideoQuestion, setIsVideoQuestion] = useState(
    currentQuestion?.isVideoQuestion
  )

  // [CLEAN_FUNCTIONS]
  const requireStateChange = (switchValue) => {
    setRequiredSwitchValue(!switchValue)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isRequired: switchValue }
    })
  }
  const isVideoQuestionStateChange = (switchValue) => {
    setRequiredSwitchValue(!switchValue)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isVideoQuestion: switchValue }
    })
  }

  //condition to prevent configure required state for welcome screen and statement
  const isNotWelcomeScreenOrStatement = ![
    QUESTION_TYPES.WELCOME_SCREEN,
    QUESTION_TYPES.STATEMENT
  ].includes(currentQuestion?.questionType)

  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setRequiredSwitchValue(currentQuestion?.isRequired)
    setIsVideoQuestion(currentQuestion?.isVideoQuestion)
  }, [currentQuestion])

  useEffect(() => {
    if (!!currentQuestion?.isVideoQuestion)
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
        payload: { title: 'Video question', layoutType: 'DEFAULT' }
      })
  }, [currentQuestion?.isVideoQuestion, currentQuestionDispatch])

  return (
    <Box px={3} pt={3} h="between">
      {isNotWelcomeScreenOrStatement && (
        <Row mb="8px" noGutters v="center">
          <Col v="center">
            <Text color="var(--qf-typography-subtitle-color)">
              {t('Required')}
            </Text>
          </Col>
          <Col cw="auto" px={2}>
            <Switch
              size="small"
              onChange={requireStateChange}
              checked={requiredSwitchValue}
            />
          </Col>
        </Row>
      )}
      <Row mb="8px" noGutters v="center">
        <Col>
          <Text color="var(--qf-typography-subtitle-color)">
            {t('Video question')}
          </Text>
        </Col>
        <Col cw="auto" px={2}>
          <Switch
            size="small"
            onChange={isVideoQuestionStateChange}
            checked={isVideoQuestion}
          />
        </Col>
      </Row>
      {[
        QUESTION_TYPES.OPINION_SCALE,
        QUESTION_TYPES.RATING,
        QUESTION_TYPES.RATING_EXTENDED
      ].includes(currentQuestion.questionType) && <AmountOptionsCustomConfig />}
    </Box>
  )
}

export default QuestionConfigurationMenu
