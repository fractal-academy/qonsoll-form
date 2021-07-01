import React, { useEffect, useState } from 'react'
import ActionsFunctionsContext from 'feedback-typeform-app/src/context/ActionsFunctions/ActionsFunctionsContext'
import { TranslationContext } from 'feedback-typeform-app/src/context/Translation'
import TypeformConfigurationContext from 'feedback-typeform-app/src/context/TypeformConfigurationContext'
import FirebaseContext from 'feedback-typeform-app/src/context/Firebase/FirebaseContext'
import useFunctions from 'feedback-typeform-app/src/hooks/useFunctions'
import { useAnswersContextDispatch } from 'feedback-typeform-app/src/context/Answers'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormAnswers(props) {
  const {
    firebase,
    actions = {},
    id,
    translate,
    submitLoading,
    configurations,
    wrapperHeight,
    wrapperOffset
  } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answersDispatch = useAnswersContextDispatch()
  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

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
  }, [])

  return (
    // <FirebaseContext.Provider value={firebase}>
    //   <ActionsFunctionsContext.Provider value={actions}>
    //     <TranslationContext.Provider value={{ t: translate }}>
    //       <TypeformConfigurationContext.Provider value={configurations}>
    <>FormAnswers TEXT</>

    /*      </TypeformConfigurationContext.Provider>*/

    /*    </TranslationContext.Provider>*/

    /*  </ActionsFunctionsContext.Provider>*/

    /*</FirebaseContext.Provider>*/
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
