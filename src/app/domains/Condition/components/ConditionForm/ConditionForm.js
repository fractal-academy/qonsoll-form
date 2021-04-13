import React, { cloneElement, useEffect, useState } from 'react'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Card, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import Search from 'antd/es/input/Search'
import { SearchOutlined } from '@ant-design/icons'
import { QUESTION_TYPE, QUESTION_TYPE_VALUE } from 'app/constants/quetstionType'
import { ANSWER_TYPE } from 'app/constants/answerType'
import YesNoChoiceTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/YesNoChoiceTemplate'
import PlaneTextStringTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainTextStringTemplate'
import PlaneTextDateTemplate from 'domains/Condition/components/ConditionForm/ConditionTemplates/PlainTextDateTemplate'
import { ChoiceTemplate } from 'domains/Condition/components/ConditionForm/ConditionTemplates'
import Title from 'antd/lib/typography/Title'
// import { ConditionRuleSelect } from 'domains/Condition/components'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

export const mockQuestion = {
  questions: [
    {
      name: 'Yes/no question example',
      orderNumber: '1. ',
      questionType: QUESTION_TYPE.YES_NO,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['Yes', 'No']
    },
    {
      name: 'Picture choice question example',
      orderNumber: '2. ',
      questionType: QUESTION_TYPE.PICTURE_CHOICE,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['Picture 1', 'Picture 2', 'Picture 3', 'Picture 4']
    },
    {
      name: 'Opinion scale question example',
      orderNumber: '3. ',
      questionType: QUESTION_TYPE.PICTURE_CHOICE,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['1', '2', '3']
    },
    {
      name: 'Rating question example',
      orderNumber: '4. ',
      questionType: QUESTION_TYPE.RATING,
      answerType: ANSWER_TYPE.CHOICE,
      answers: ['1', '2', '3']
    },
    {
      name: 'Short text question example',
      orderNumber: '5. ',
      questionType: QUESTION_TYPE.SHORT_TEXT,
      answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
      answers: ['Short text']
    },
    {
      name: 'Long text question example',
      orderNumber: '6. ',
      questionType: QUESTION_TYPE.LONG_TEXT,
      answerType: ANSWER_TYPE.PLAIN_TEXT_STRING,
      answers: ['Long text']
    },
    {
      name: 'Date question example',
      orderNumber: '7. ',
      questionType: QUESTION_TYPE.DATE,
      answerType: ANSWER_TYPE.PLAIN_TEXT_DATE,
      answers: ['2021-14-05']
    }
  ]
}

const questionTypesMap = {
  [QUESTION_TYPE.YES_NO]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPE.PICTURE_CHOICE]: {
    component: <ChoiceTemplate />
  },
  [QUESTION_TYPE.OPINION_SCALE]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPE.RATING]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPE.SHORT_TEXT]: {
    component: <PlaneTextStringTemplate />
  },
  [QUESTION_TYPE.LONG_TEXT]: {
    component: <PlaneTextStringTemplate />
  },
  [QUESTION_TYPE.DATE]: {
    component: <PlaneTextDateTemplate />
  }
}

function ConditionForm(props) {
  const { onChange, conditionType } = props

  return (
    <Row h="center" noGutters>
      <Col>
        {mockQuestion.questions.map((item, index) => (
          <>
            <Title level={5} strong>
              {item.orderNumber} {item.name}
            </Title>
            {cloneElement(questionTypesMap[item.questionType].component, {
              ...item
            })}
          </>
        ))}
      </Col>
    </Row>
  )
}
ConditionForm.propTypes = {}
export default ConditionForm
