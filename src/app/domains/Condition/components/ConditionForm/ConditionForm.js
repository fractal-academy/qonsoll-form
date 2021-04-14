import React, { cloneElement, useEffect, useState } from 'react'
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

export const mockQuestion = {
  questions: [
    {
      name: 'Yes/no question example',
      questionType: QUESTION_TYPE.YES_NO,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['Yes', 'No']
    },
    {
      name: 'Picture choice question example',
      questionType: QUESTION_TYPE.PICTURE_CHOICE,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['Picture 1', 'Picture 2', 'Picture 3']
    },
    {
      name: 'Opinion scale question example',
      questionType: QUESTION_TYPE.OPINION_SCALE,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['1', '2', '3']
    },
    {
      name: 'Rating question example',
      questionType: QUESTION_TYPE.RATING,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['1', '2', '3']
    },
    {
      name: 'Short text question example',
      questionType: QUESTION_TYPE.SHORT_TEXT,
      answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
      answers: ['']
    },
    {
      name: 'Long text question example',
      questionType: QUESTION_TYPE.LONG_TEXT,
      answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
      answers: ['Long text']
    },
    {
      name: 'Date question example',
      questionType: QUESTION_TYPE.DATE,
      answerType: ANSWER_TYPE.PLAIN_TEXT_DATE,
      answers: ['2021-14-05']
    },
    {
      name: 'File upload question example',
      questionType: QUESTION_TYPE.FILE_UPLOAD,
      answerType: ANSWER_TYPE.FILE,
      answers: ['']
    }
  ]
}

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

  return (
    <Row h="center" noGutters>
      <Col>
        {mockQuestion.questions.map((item, index) => (
          <Card number={number++} key={index}>
            <Box ml={3}>
              <Title level={5} strong>
                {item.name}
              </Title>
              {cloneElement(questionTypesMap[item.questionType].component, {
                ...item
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
