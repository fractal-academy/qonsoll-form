import React, { useState } from 'react'
import { ConditionForm } from '../../../../domains/Condition/components'
import { QUESTION_TYPES, ANSWER_TYPES } from '../../../../constants'
import { Box } from '@qonsoll/react-design'

const mockQuestion = [
  {
    id: 1,
    name: 'Yes/no question example',
    questionType: QUESTION_TYPES.YES_NO,
    answerType: ANSWER_TYPES.CHOICE,
    questionOptions: [
      { name: 'Yes', redirectQuestion: '' },
      { name: 'No', redirectQuestion: '' }
    ]
  },
  {
    id: 2,
    name: 'Picture choice question example',
    questionType: QUESTION_TYPES.PICTURE_CHOICE,
    answerType: ANSWER_TYPES.CHOICE,
    questionOptions: [
      { name: 'Picture 1', redirectQuestion: '' },
      { name: 'Picture 2', redirectQuestion: '' },
      { name: 'Picture 3', redirectQuestion: '' }
    ]
  },
  {
    id: 3,
    name: 'Opinion scale question example',
    questionType: QUESTION_TYPES.OPINION_SCALE,
    answerType: ANSWER_TYPES.CHOICE,
    questionOptions: [
      { name: '1', redirectQuestion: '' },
      { name: '2', redirectQuestion: '' },
      { name: '3', redirectQuestion: '' }
    ]
  },
  {
    id: 4,
    name: 'Rating question example',
    questionType: QUESTION_TYPES.RATING,
    answerType: ANSWER_TYPES.CHOICE,
    questionOptions: [
      { name: '1', redirectQuestion: '' },
      { name: '2', redirectQuestion: '' },
      { name: '3', redirectQuestion: '' }
    ]
  },
  {
    id: 5,
    name: 'Short text question example',
    questionType: QUESTION_TYPES.SHORT_TEXT,
    answerType: ANSWER_TYPES.PLAIN_TEXT_STRING,
    questionOptions: [{ name: '', redirectQuestion: '' }]
  },
  {
    id: 6,
    name: 'Long text question example',
    questionType: QUESTION_TYPES.LONG_TEXT,
    //excess property
    // answerType: ANSWER_TYPES.PLAIN_TEXT_STRING,

    //question options
    questionOptions: [{ name: '', redirectQuestion: '' }]
  },
  {
    id: 7,
    name: 'Date question example',
    questionType: QUESTION_TYPES.DATE,
    answerType: ANSWER_TYPES.PLAIN_TEXT_DATE,
    questionOptions: [{ name: '', redirectQuestion: '' }]
  },
  {
    id: 8,
    name: 'File upload question example',
    questionType: QUESTION_TYPES.FILE_UPLOAD,
    answerType: ANSWER_TYPES.FILE,
    questionOptions: [{ name: '111', redirectQuestion: '' }]
  }
]

function FormConditionsForm(props) {
  const { data } = props

  // [CLEAN FUNCTIONS]
  const [questionsData, setQuestionsData] = useState(data)

  const getQuestionListRedirect = (itemIndex) => {
    return questionsData.filter((item, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    questionsData[index].questionConfigurations = [
      ...questionsData[index]?.questionConfigurations,
      answer
    ]
    setQuestionsData([...questionsData])
  }
  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    questionsData[index].questionConfigurations[answerIndex].redirectQuestion =
      nextQuestion

    setQuestionsData([...questionsData])
  }

  return (
    <>
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
    </>
  )
}

FormConditionsForm.propTypes = {}

export default FormConditionsForm
