import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../context/CurrentQuestion'

import ChoiceList from './ChoiceList'
import MediaList from './MediaList'
import PropTypes from 'prop-types'
import React from 'react'
import { v4 as uuid } from 'uuid'

function ChoiceEditableGroup(props) {
  const { withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.questionConfigurations || []
  const listData = [{ isCreate: true }, ...choiceProps]

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        questionConfigurations: choiceProps
          ? [
              ...choiceProps,
              {
                image: '',
                answerOption: '',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
          : [
              {
                image: '',
                answerOption: '',
                redirectQuestion: '',
                answerOptionId: uuid(),
                redirectConditionRule: ''
              }
            ]
      }
    })
  }

  // workaround to make list listen to different
  // grid settings on question change
  return withImage ? (
    <MediaList
      data={listData}
      withImage={withImage}
      onAddChoice={onAddChoice}
    />
  ) : (
    <ChoiceList
      data={listData}
      withImage={withImage}
      onAddChoice={onAddChoice}
    />
  )
}

ChoiceEditableGroup.propTypes = {
  withImage: PropTypes.bool
}

export default ChoiceEditableGroup
