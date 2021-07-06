import React, { useMemo } from 'react'
import { ConditionForm } from '../../../../domains/Condition/components'
import { QUESTION_TYPES } from '../../../../constants'
import { Box } from '@qonsoll/react-design'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import { Tabs } from 'antd'
import EndingsSimpleView from '../../../Condition/components/Endings/EndingsSimpleView'
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
          {endings?.map((item, index) => (
            <Box mb={3}>
              <EndingsSimpleView
                questionsData={filteredAnswerForEndings}
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
