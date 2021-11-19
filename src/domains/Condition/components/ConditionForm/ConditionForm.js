import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'
import { Title } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
import { QUESTION_TYPES } from '../../../../constants'
import {
  TextTemplate,
  ChoiceTemplate
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
      component: <ChoiceTemplate />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceTemplate choices={item?.questionConfigurations} />
    },
    [QUESTION_TYPES.CHOICE]: {
      component: <ChoiceTemplate choices={item?.questionConfigurations} />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <ChoiceTemplate />
    },
    [QUESTION_TYPES.RATING]: {
      component: <ChoiceTemplate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: <TextTemplate />
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: <TextTemplate />
    },
    [QUESTION_TYPES.DATE]: {
      component: <TextTemplate handlesDate />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <ChoiceTemplate handlesUpload />
    },
    [QUESTION_TYPES.VIDEO_ANSWER]: {
      component: <ChoiceTemplate handlesRecord />
    },
    [QUESTION_TYPES.ENDING]: {
      component: <></>
    }
  }

  return (
    <NumberedCard top="24px" number={index + 1} key={index}>
      <Title
        color="var(--qf-typography-title-color)"
        textOverflow="ellipsis"
        level={5}
        mb={2}>
        {item?.title}
      </Title>

      {cloneElement(questionTypesMap[item?.questionType].component, {
        ...item,
        addCondition: (answer) => addCondition(answer, index),
        addRedirectQuestion: (question, answerIndex) =>
          addRedirectQuestion(question, answerIndex, index),
        questionList: getQuestionListRedirect(index)
      })}
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
