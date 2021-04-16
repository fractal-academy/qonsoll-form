import React, { cloneElement, useState } from 'react'
import { Box } from '@qonsoll/react-design'
import { QUESTION_TYPE } from 'app/constants'
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
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

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
  const {
    mockQuestionIndex,
    item,
    addCondition,
    addRedirectQuestion,
    getQuestionListRedirect
  } = props
  return (
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
