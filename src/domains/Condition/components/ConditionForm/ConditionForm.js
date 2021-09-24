import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { Box, Title } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
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
      component: <></>
    }
  }

  return (
    <NumberedCard top="24px" number={index + 1} key={index}>
      <Box>
        <Box mb={2}>
          <Title color="var(--qf-typography-title-color)" level={5}>
            {item?.title}
          </Title>
        </Box>
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
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default ConditionForm
