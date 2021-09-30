import { Tabs } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import {
  ConditionForm,
  ScoreConditionsAdvancedView,
  EndingsSimpleView
} from '../../../../domains/Condition/components'
import useFunctions from '../../../../hooks/useFunctions'
import { Container, Box, NoData } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import { EmptyState, CustomTabs } from './FormConditionsForm.styles'
import { QUESTION_TYPES, COLLECTIONS, TEXTINGS } from '../../../../constants'

const { TabPane } = Tabs

function FormConditionsForm(props) {
  const { data, endings, formData, onTabChange, answerScores } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const {
    conditionsQuizTab,
    conditionsEndingsTab,
    conditionsLogicJumpsTab,
    conditionsNoData,
    conditionAddQuestionType
  } = useTranslation()

  // [CLEAN FUNCTIONS]
  const getQuestionListRedirect = (itemIndex) => {
    return data?.filter((_, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    setData(COLLECTIONS.QUESTIONS, data?.[index]?.id, {
      questionConfigurations: [...data?.[index]?.questionConfigurations, answer]
    })
  }

  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    //create new array questionConfigur ations of certain question

    const updatedQuestionConfigurations = data[index]?.questionConfigurations
    // update redirect question of certain question
    const isDataChanged =
      updatedQuestionConfigurations[answerIndex].redirectQuestion !==
      nextQuestion
    // if data changed - write to db, else - nothing
    if (isDataChanged) {
      updatedQuestionConfigurations[answerIndex].redirectQuestion = nextQuestion
      //write new data to db
      setData(COLLECTIONS.QUESTIONS, data[index]?.id, {
        questionConfigurations: updatedQuestionConfigurations
      })
    }
  }

  const findAnswerScoreByQuestionId = (questionId) =>
    answerScores?.find((item) => item?.questionId === questionId)

  //[COMPUTED PROPERTIES]
  const filteredAnswerForEndings = useMemo(
    () =>
      data
        ? data?.filter((item) =>
            [
              QUESTION_TYPES.CHOICE,
              QUESTION_TYPES.PICTURE_CHOICE,
              QUESTION_TYPES.OPINION_SCALE,
              QUESTION_TYPES.RATING,
              QUESTION_TYPES.YES_NO
            ].includes(item.questionType)
          )
        : [],
    [data]
  )

  return (
    <Container>
      <CustomTabs onChange={onTabChange}>
        <TabPane
          tab={conditionsLogicJumpsTab || TEXTINGS.conditionsLogicJumpsTab}
          key="1"
          style={{
            overflowY: 'scroll',
            overflow: 'hidden'
          }}>
          {!!data?.length ? (
            data?.map((item, index) => (
              <Box mb={3} ml={2} key={index}>
                <ConditionForm
                  key={index}
                  item={item}
                  index={index}
                  addCondition={addCondition}
                  addRedirectQuestion={addRedirectQuestion}
                  getQuestionListRedirect={getQuestionListRedirect}
                />
              </Box>
            ))
          ) : (
            <EmptyState
              image={NoData.PRESENTED_IMAGE_SIMPLE}
              description={conditionsNoData || TEXTINGS.conditionsNoData}
            />
          )}
        </TabPane>
        <TabPane
          tab={conditionsEndingsTab || TEXTINGS.conditionsEndingsTab}
          key="2"
          style={{ overflowY: 'scroll', overflow: 'hidden' }}>
          {!!filteredAnswerForEndings?.length && !!endings?.length ? (
            endings?.map((item, index) => (
              <Box mb={3} ml={2} key={index}>
                <EndingsSimpleView
                  key={index}
                  item={item}
                  index={index}
                  addCondition={addCondition}
                  questionsData={filteredAnswerForEndings}
                  addRedirectQuestion={addRedirectQuestion}
                  getQuestionListRedirect={getQuestionListRedirect}
                />
              </Box>
            ))
          ) : (
            <EmptyState
              image={NoData.PRESENTED_IMAGE_SIMPLE}
              description={conditionsNoData || TEXTINGS.conditionsNoData}
            />
          )}
        </TabPane>
        {formData?.isQuiz && (
          <TabPane
            style={{ overflowY: 'scroll', overflow: 'hidden' }}
            tab={conditionsQuizTab || TEXTINGS.conditionsQuizTab}
            key="3">
            {!!filteredAnswerForEndings?.length ? (
              filteredAnswerForEndings?.map((item, index) => (
                <Box mb={3} ml={2} key={index}>
                  <ScoreConditionsAdvancedView
                    key={index}
                    questionData={item}
                    index={index}
                    questionScoresData={findAnswerScoreByQuestionId(item?.id)}
                  />
                </Box>
              ))
            ) : (
              <EmptyState
                image={NoData.PRESENTED_IMAGE_SIMPLE}
                description={conditionsNoData || TEXTINGS.conditionsNoData}>
                {`${
                  conditionAddQuestionType || TEXTINGS.conditionAddQuestionType
                }:`}
                <br />
                {`${QUESTION_TYPES.CHOICE},
                ${QUESTION_TYPES.PICTURE_CHOICE},
                ${QUESTION_TYPES.OPINION_SCALE},
                ${QUESTION_TYPES.RATING},
                ${QUESTION_TYPES.YES_NO}`}
              </EmptyState>
            )}
          </TabPane>
        )}
      </CustomTabs>
    </Container>
  )
}

FormConditionsForm.propTypes = {
  onTabChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  endings: PropTypes.array
}

export default FormConditionsForm
