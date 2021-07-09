import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
import Title from 'antd/lib/typography/Title'
import { QUESTION_TYPES } from '../../../../constants'
import {
  RatingTemplate,
  FileUploadTemplate,
  YesNoChoiceTemplate,
  OpinionScaleTemplate,
  PlaneTextDateTemplate,
  ChoiceTemplate,
  PlaneLongTextStringTemplate,
  PlaneShortTextStringTemplate
} from '../../../../domains/Condition/components/ConditionTemplates'
import Text from 'antd/es/typography/Text'

function ConditionForm(props) {
  const {
    item,
    index,
    addCondition,
    addRedirectQuestion,
    getQuestionListRedirect
  } = props

  const questionTypesMap = {
    [QUESTION_TYPES.YES_NO]: {
      component: <YesNoChoiceTemplate />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceTemplate choices={item?.questionConfigurations} />
    },
    [QUESTION_TYPES.CHOICE]: {
      component: <ChoiceTemplate choices={item?.questionConfigurations} />
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
    },
    [QUESTION_TYPES.ENDING]: {
      component: <>Ending.</>
    }
  }

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Text level={5}>{item?.title}</Text>
        {cloneElement(questionTypesMap[item?.questionType].component, {
          ...item,
          addCondition: (answer) => addCondition(answer, index),
          addRedirectQuestion: (question, answerIndex) =>
            addRedirectQuestion(question, answerIndex, index),
          questionList: getQuestionListRedirect(index)
        })}
      </Box>
    </NumberedCard>
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
