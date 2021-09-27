import React from 'react'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'
import { COLLECTIONS } from '../../../../constants'
import { NumberedCard } from '../../../../components'
import useFunctions from '../../../../hooks/useFunctions'
import { useTranslation } from '../../../../context/Translation'
import { Box, Row, Col, Text, Title } from '@qonsoll/react-design'
import { QuestionPreview, LetterBox } from '../ConditionTemplates.styles'

const startLetter = 65

const ScoreConditionsAdvancedView = (props) => {
  const { index, questionData, questionScoresData = {} } = props

  // [ADDITIONAL HOOKS]
  const { setData, getCollectionRef } = useFunctions()
  const { scoreWeightTitle } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onMarkChange = async (
    questionId,
    formId,
    questionScoreValue,
    answerOptionId
  ) => {
    if (!/^\d+$/.test(questionScoreValue) || questionScoreValue < 0) return
    const answerScoresId =
      questionScoresData?.id ||
      getCollectionRef(COLLECTIONS.ANSWERS_SCORES_CONDITIONS).doc().id
    const questionScores = questionScoresData.questionScores?.length
      ? [
          ...questionScoresData?.questionScores.filter(
            (item) => item.answerOptionId !== answerOptionId
          ),
          { answerOptionId, score: questionScoreValue }
        ]
      : [{ answerOptionId, score: questionScoreValue }]
    await setData(COLLECTIONS.ANSWERS_SCORES_CONDITIONS, answerScoresId, {
      questionId,
      formId: formId,
      questionScores,
      id: answerScoresId
    })
  }

  const getScoreByAnswerOptionId = (answerOptionId) =>
    questionScoresData?.questionScores?.find(
      (item) => item?.answerOptionId === answerOptionId
    )?.score

  return (
    <NumberedCard top="24px" number={index + 1} key={index}>
      <Box>
        <Title
          color="var(--qf-typography-title-color)"
          textOverflow="ellipsis"
          level={5}
          mb={2}>
          {questionData?.title}
        </Title>

        {questionData?.questionConfigurations?.map((item, index) => (
          <Row mb={2} key={index}>
            <Col cw={8} pr={2} pl={0}>
              <QuestionPreview px={3}>
                <LetterBox px={2} mr={2}>
                  <Text color="var(--qf-typography-subtitle-color)" strong>
                    {String.fromCharCode(startLetter + index)}
                  </Text>
                </LetterBox>
                <Text
                  color="var(--qf-typography-title-color)"
                  variant="body1"
                  ellipsis>
                  {item?.answerOption}
                </Text>
              </QuestionPreview>
            </Col>
            <Col cw={4} pr={0} pl={2}>
              <InputNumber
                min={0}
                max={10}
                placeholder={scoreWeightTitle || 'Enter score weight of answer'}
                value={getScoreByAnswerOptionId(item?.answerOptionId)}
                onBlur={(event) =>
                  onMarkChange(
                    questionData?.id,
                    questionData?.formId,
                    event.target.value,
                    item?.answerOptionId
                  )
                }
              />
            </Col>
          </Row>
        ))}
      </Box>
    </NumberedCard>
  )
}

ScoreConditionsAdvancedView.propTypes = {
  index: PropTypes.number.isRequired,
  questionData: PropTypes.object,
  questionScoresData: PropTypes.object
}

export default ScoreConditionsAdvancedView
