import React, { useMemo } from 'react'
import {
  ConditionForm,
  ScoreConditionsAdvancedView,
  EndingsSimpleView
} from '../../../../domains/Condition/components'
import { Tabs } from 'antd'
import { QUESTION_TYPES } from '../../../../constants'
import { Box, NoData } from '@qonsoll/react-design'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import PropTypes from 'prop-types'
import { useTranslation } from '../../../../context/Translation'
import { EmptyState, CustomTabs } from './FormConditionsForm.styles'

const { TabPane } = Tabs

function FormConditionsForm(props) {
  const { data, endings, formData, onTabChange, answerScores } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const {
    conditionsEndingsTab,
    conditionsLogicJumpsTab,
    noDataToConfigureEndings,
    noDataToConfigureLogicJumps,
    promiseAddSpecialQuestionTypes,
    conditionsAnswersScoreConfigTab
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
    <>
      <CustomTabs onChange={onTabChange}>
        <TabPane
          tab={conditionsLogicJumpsTab || 'Logic jumps'}
          key="1"
          style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <Box mb={3}>
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
              description={
                noDataToConfigureLogicJumps ||
                'There are no any question that allows to configure Logic Jumps.'
              }
            />
          )}
        </TabPane>
        <TabPane
          tab={conditionsEndingsTab || 'Endings'}
          key="2"
          style={{ overflowY: 'scroll', overflowX: 'hidden', color: 'red' }}>
          {!!filteredAnswerForEndings?.length > 0 && endings?.length > 0 ? (
            endings?.map((item, index) => (
              <Box mb={3}>
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
              description={
                noDataToConfigureEndings ||
                'There are no any question that allows to configure endings.'
              }
            />
          )}
        </TabPane>
        {formData?.isQuiz && (
          <TabPane
            style={{ overflowY: 'scroll', overflowX: 'hidden' }}
            tab={
              conditionsAnswersScoreConfigTab || 'Answers score configurations'
            }
            key="3">
            {filteredAnswerForEndings?.length > 0 ? (
              filteredAnswerForEndings?.map((item, index) => (
                <Box mb={3}>
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
                description={
                  noDataToConfigureEndings ||
                  `There are no any question that allows to configure answers scores.`
                }>
                {promiseAddSpecialQuestionTypes ||
                  'Please, add one of the types of questions:'}
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
    </>
  )
}

FormConditionsForm.propTypes = {
  onTabChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  endings: PropTypes.array
}

export default FormConditionsForm
