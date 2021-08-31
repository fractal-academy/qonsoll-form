import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import {
  OptionBox,
  StyledInputNumber,
  CustomTextBox
} from './ScoreConditionsAdvancedView.style'
import { Box, Row, Col } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'

const { Text, Title } = Typography
const startLetter = 65

const ScoreConditionsAdvancedView = (props) => {
  const { index, questionData, questionScoresData = {} } = props

  // [ADDITIONAL HOOKS]
  const { setData, getCollectionRef } = useFunctions()
  const { scoreWeightTranslation } = useTranslation()

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
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title level={5} style={{ marginBottom: '10px' }}>
          {questionData?.title}
        </Title>
        {questionData?.questionConfigurations?.map((item, index) => (
          <Row mb={2} key={index}>
            <Col cw={8} pl={0} pr={2}>
              <OptionBox px={3}>
                <CustomTextBox mr={2} px={2}>
                  <Text strong>{String.fromCharCode(startLetter + index)}</Text>
                </CustomTextBox>
                <Text ellipsis>{item?.answerOption}</Text>
              </OptionBox>
            </Col>
            <Col cw={4}>
              <StyledInputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder={
                  scoreWeightTranslation || 'Enter score weight of answer'
                }
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
  questionData: PropTypes.array.isRequired,
  questionScoresData: PropTypes.array.isRequired
}

export default ScoreConditionsAdvancedView
