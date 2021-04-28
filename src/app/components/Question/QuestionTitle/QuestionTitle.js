import React, { useEffect, useState } from 'react'
import { TextEditable } from 'components'
import PropTypes from 'prop-types'
import {
  useFormContextDispatch,
  useFormContext,
  DISPATCH_EVENTS
} from 'app/context/FormContext'
import { setData } from 'app/services/Firestore'
import { COLLECTIONS } from 'app/constants'
// import { useTranslation } from 'react-i18next'

function QuestionTitle(props) {
  const { placeholder } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [CUSTOM HOOKS]
  const dispatch = useFormContextDispatch()
  const currentQuestion = useFormContext()

  // [COMPONENT STATE HOOKS]
  const [textValue, setTextValue] = useState()
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onBlur = async () => {
    if (currentQuestion?.title === textValue) return
    const title = textValue || ''
    await dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { title }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, {
      ...currentQuestion,
      title
    })
  }
  const onChange = ({ target }) => {
    setTextValue(target.value)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    setTextValue(currentQuestion?.title || '')
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
      isTitle
      {...props}
    />
  )
}

QuestionTitle.propTypes = {
  placeholder: PropTypes.string
}

export default QuestionTitle
