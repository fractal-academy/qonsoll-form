import React, { cloneElement, useState } from 'react'
import { Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from 'app/constants'
import { YesNoChoiceTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneTextDateTemplate } from 'domains/Condition/components/ConditionTemplates'
import Title from 'antd/lib/typography/Title'
import { Card } from 'components'
import { PictureChoiceTemplate } from 'domains/Condition/components/ConditionTemplates'
import { OpinionScaleTemplate } from 'domains/Condition/components/ConditionTemplates'
import { RatingTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneShortTextStringTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneLongTextStringTemplate } from 'domains/Condition/components/ConditionTemplates'
import { FileUploadTemplate } from 'domains/Condition/components/ConditionTemplates'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

const questionTypesMap = {
  [QUESTION_TYPES.YES_NO]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPES.PICTURE_CHOICE]: {
    component: <PictureChoiceTemplate />
  },
  [QUESTION_TYPES.OPINION_SCALE]: {
    component: <OpinionScaleTemplate />
  },
  [QUESTION_TYPES.RATING]: {
    component: <RatingTemplate />
  },
  [QUESTION_TYPES.SHORT_TEXT]: {
    component: <PlaneShortTextStringTemplate />
  },
  [QUESTION_TYPES.LONG_TEXT]: {
    component: <PlaneLongTextStringTemplate />
  },
  [QUESTION_TYPES.DATE]: {
    component: <PlaneTextDateTemplate />
  },
  [QUESTION_TYPES.FILE_UPLOAD]: {
    component: <FileUploadTemplate isUploaded />
  }
}

function ConditionForm(props) {
  const {
    mockQuestionIndex,
    item,
    addCondition,
    addRedirectQuestion,
    getQuestionListRedirect
  } = props
  return (
    <Box mb={3}>
      <Card number={mockQuestionIndex + 2} key={mockQuestionIndex}>
        <Box ml={3}>
          <Title level={5} strong>
            {item.name}
          </Title>
          {cloneElement(questionTypesMap[item.questionType].component, {
            ...item,
            addCondition: (answer) => addCondition(answer, mockQuestionIndex),
            addRedirectQuestion: (question, answerIndex) =>
              addRedirectQuestion(question, answerIndex, mockQuestionIndex),
            questionList: getQuestionListRedirect(mockQuestionIndex)
          })}
        </Box>
      </Card>
    </Box>
  )
}
ConditionForm.propTypes = {
  mockQuestionIndex: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default ConditionForm
