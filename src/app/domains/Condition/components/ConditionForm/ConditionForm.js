import React, { cloneElement, useEffect, useMemo, useState } from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import Search from 'antd/es/input/Search'
import { SearchOutlined } from '@ant-design/icons'
import { QUESTION_TYPE, QUESTION_TYPE_VALUE } from 'app/constants/quetstionType'
import { ANSWER_TYPE } from 'app/constants/answerType'
import YesNoChoiceTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/YesNoChoiceTemplate'
import PlaneTextDateTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainTextDateTemplate'
import { ChoiceTemplate } from 'domains/Condition/components/ConditionForm/ConditionTemplates'
import Title from 'antd/lib/typography/Title'
import { Card } from 'components'
import PictureChoiceTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PictureChoiceTemplate'
import OpinionScaleTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/OpinionScaleTemplate'
import RatingTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/RatingTemplate'
import PlaneShortTextStringTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainShortTextStringTemplate'
import PlaneLongTextStringTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainLongTextStringTemplate'
import FileUploadTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/FileUploadTemplate'
// import { ConditionRuleSelect } from 'domains/Condition/components'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

export const mockQuestion = [
  {
    id: 1,
    name: 'Yes/no question example',
    questionType: QUESTION_TYPE.YES_NO,
    answerType: ANSWER_TYPE.CHOICE,
    answers: [
      { name: 'Yes', redirectQuestion: null },
      { name: 'No', redirectQuestion: null }
    ]
  },
  {
    id: 2,
    name: 'Picture choice question example',
    questionType: QUESTION_TYPE.PICTURE_CHOICE,
    answerType: ANSWER_TYPE.CHOICE,
    answers: [
      { name: 'Picture 1', redirectQuestion: null },
      { name: 'Picture 2', redirectQuestion: null },
      { name: 'Picture 3', redirectQuestion: null }
    ]
  },
  {
    id: 3,
    name: 'Opinion scale question example',
    questionType: QUESTION_TYPE.OPINION_SCALE,
    answerType: ANSWER_TYPE.CHOICE,
    answers: [
      { name: '1', redirectQuestion: null },
      { name: '2', redirectQuestion: null },
      { name: '3', redirectQuestion: null }
    ]
  },
  {
    id: 4,
    name: 'Rating question example',
    questionType: QUESTION_TYPE.RATING,
    answerType: ANSWER_TYPE.CHOICE,
    answers: [
      { name: '1', redirectQuestion: null },
      { name: '2', redirectQuestion: null },
      { name: '3', redirectQuestion: null }
    ]
  },
  {
    id: 5,
    name: 'Short text question example',
    questionType: QUESTION_TYPE.SHORT_TEXT,
    answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 6,
    name: 'Long text question example',
    questionType: QUESTION_TYPE.LONG_TEXT,
    answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 7,
    name: 'Date question example',
    questionType: QUESTION_TYPE.DATE,
    answerType: ANSWER_TYPE.PLAIN_TEXT_DATE,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 8,
    name: 'File upload question example',
    questionType: QUESTION_TYPE.FILE_UPLOAD,
    answerType: ANSWER_TYPE.FILE,
    answers: [{ name: '', redirectQuestion: null }]
  }
]

const questionTypesMap = {
  [QUESTION_TYPE.YES_NO]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPE.PICTURE_CHOICE]: {
    component: <PictureChoiceTemplate />
  },
  [QUESTION_TYPE.OPINION_SCALE]: {
    component: <OpinionScaleTemplate />
  },
  [QUESTION_TYPE.RATING]: {
    component: <RatingTemplate />
  },
  [QUESTION_TYPE.SHORT_TEXT]: {
    component: <PlaneShortTextStringTemplate />
  },
  [QUESTION_TYPE.LONG_TEXT]: {
    component: <PlaneLongTextStringTemplate />
  },
  [QUESTION_TYPE.DATE]: {
    component: <PlaneTextDateTemplate />
  },
  [QUESTION_TYPE.FILE_UPLOAD]: {
    component: <FileUploadTemplate isUploaded />
  }
}

function ConditionForm(props) {
  const { onChange, conditionType } = props
  let number = 2

  const [questionsData, setQuestionsData] = useState(mockQuestion)
  console.log(questionsData)
  const getQuestionListRedirect = (itemIndex) => {
    return questionsData.filter((item, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    questionsData[index].answers = [...questionsData[index].answers, answer]
    setQuestionsData([...questionsData])
  }
  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    questionsData[index].answers[answerIndex].redirectQuestion = nextQuestion

    setQuestionsData([...questionsData])
  }

  return (
    <Row h="center" noGutters>
      <Col>
        {mockQuestion.map((item, mockQuestionIndex) => (
          <Card number={number++} key={mockQuestionIndex}>
            <Box ml={3}>
              <Title level={5} strong>
                {item.name}
              </Title>
              {cloneElement(questionTypesMap[item.questionType].component, {
                ...item,
                addCondition: (answer) =>
                  addCondition(answer, mockQuestionIndex),
                addRedirectQuestion: (question, answerIndex) =>
                  addRedirectQuestion(question, answerIndex, mockQuestionIndex),
                questionList: getQuestionListRedirect(mockQuestionIndex)
              })}
            </Box>
          </Card>
        ))}
      </Col>
    </Row>
  )
}
ConditionForm.propTypes = {}
export default ConditionForm
