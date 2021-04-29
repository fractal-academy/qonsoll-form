import React, { useEffect, useState } from 'react'
import { TextEditable } from 'components'
import PropTypes from 'prop-types'
import {
  useCurrentQuestionContextDispatch,
  useCurrentQuestionContext,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import { setData } from 'app/services/Firestore'
import { COLLECTIONS } from 'app/constants'
// import { useTranslation } from 'react-i18next'

function QuestionSubtitle(props) {
  const { placeholder } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const currentQuestion = useCurrentQuestionContext()

  // [COMPONENT STATE HOOKS]
  const [textValue, setTextValue] = useState(currentQuestion?.subtitle || '')

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onBlur = async () => {
    const subtitle = textValue || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ...currentQuestion, subtitle }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, {
      ...currentQuestion,
      subtitle
    })
  }
  const onChange = ({ target }) => {
    setTextValue(target.value)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    setTextValue(currentQuestion?.subtitle || '')
    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [currentQuestion])

  return (
    <TextEditable
      value={textValue}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      textSecondary
    />
  )
}

QuestionSubtitle.propTypes = {
  placeholder: PropTypes.string
}

export default QuestionSubtitle
