import { Box, Container, NoData } from '@qonsoll/react-design'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import {
  ConditionForm,
  EndingsSimpleView,
  ScoreConditionsAdvancedView
} from '../../../../domains/Condition/components'
import { CustomTabs, EmptyState } from './FormConditionsForm.styles'
import React, { useMemo } from 'react'

import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

const { TabPane } = Tabs

function FormConditionsForm(props) {
  const { data, endings, formData, onTabChange, answerScores } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()
  const { t } = useTranslations()

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
          tab={t('Logic jumps')}
          key="1"
          style={{
            overflowY: 'scroll',
            overflow: 'hidden'
          }}>
          {data?.length ? (
            data?.map((item, index) => (
              <Box mb="24px" ml="8px" key={index}>
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
              description={t('There are no question to configure')}
            />
          )}
        </TabPane>
        <TabPane
          tab={t('Endings')}
          key="2"
          style={{ overflowY: 'scroll', overflow: 'hidden' }}>
          {!!filteredAnswerForEndings?.length && !!endings?.length ? (
            endings?.map((item, index) => (
              <Box mb="24px" ml="8px" key={index}>
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
              description={t('There are no question to configure')}
            />
          )}
        </TabPane>
        {formData?.isQuiz && (
          <TabPane
            style={{ overflowY: 'scroll', overflow: 'hidden' }}
            tab={t('Scores')}
            key="3">
            {filteredAnswerForEndings?.length ? (
              filteredAnswerForEndings?.map((item, index) => (
                <Box mb="24px" ml="8px" key={index}>
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
                description={t('There are no question to configure')}>
                {`${t('Please, add one of the following questions types')}:`}
                <br />
                {`${t(QUESTION_TYPES.CHOICE)},
                ${t(QUESTION_TYPES.PICTURE_CHOICE)},
                ${t(QUESTION_TYPES.OPINION_SCALE)},
                ${t(QUESTION_TYPES.RATING)},
                ${t('Yes or no')}`}
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
