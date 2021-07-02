import React, { useMemo } from 'react'
import {
  ConditionForm,
  ScoreConditionsAdvancedView,
  EndingsSimpleView
} from '../../../../domains/Condition/components'
import { QUESTION_TYPES } from '../../../../constants'
import { Box } from '@qonsoll/react-design'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import { Tabs } from 'antd'
import PropTypes from 'prop-types'

const { TabPane } = Tabs

function FormConditionsForm(props) {
  const { data, endings, onTabChange } = props

  // [ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  // [CLEAN FUNCTIONS]
  const getQuestionListRedirect = (itemIndex) => {
    return data?.filter((item, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    setData(COLLECTIONS.QUESTIONS, data?.[index]?.id, {
      questionConfigurations: [...data?.[index]?.questionConfigurations, answer]
    })
  }
  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = data[index]?.questionConfigurations
    //update redirect question of certain question
    updatedQuestionConfigurations[answerIndex].redirectQuestion = nextQuestion

    //write new data to db
    setData(COLLECTIONS.QUESTIONS, data[index]?.id, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }
  const filteredAnswerForEndings = useMemo(
    () =>
      data
        ? data
            ?.filter((item) =>
              [
                QUESTION_TYPES.CHOICE,
                QUESTION_TYPES.PICTURE_CHOICE,
                QUESTION_TYPES.OPINION_SCALE,
                QUESTION_TYPES.RATING,
                QUESTION_TYPES.YES_NO
              ].includes(item.questionType)
            )
            .sort((a, b) => a.order - b.order)
        : [],
    [data]
  )
  return (
    <>
      <Tabs onChange={onTabChange} type="card">
        <TabPane tab="Logic jumps" key="1">
          {data?.map((item, index) => (
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
          ))}
        </TabPane>
        <TabPane tab="Endings" key="2">
          {!!filteredAnswerForEndings?.length
            ? endings?.map((item, index) => (
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
            : 'There are no any question that allows to configure endings.'}
        </TabPane>
        <TabPane tab="Answers score configurations" key="3">
          {data?.map((item, index) => (
            <Box mb={3}>
              <ScoreConditionsAdvancedView
                key={index}
                questionData={item}
                index={index}
              />
            </Box>
          ))}
        </TabPane>
      </Tabs>
    </>
  )
}

FormConditionsForm.propTypes = {
  onTabChange: PropTypes.func,
  data: PropTypes.array.isRequired,
  endings: PropTypes.array
}

export default FormConditionsForm
