import React from 'react'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { TranslationContext } from '../../../../context/Translation'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ResponseList from '../../../../domains/Response/components/ResponseList'

// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormAnswers(props) {
  const {
    actions = {},
    id,
    translate,
    firebase,
    submitLoading,
    configurations,
    wrapperHeight,
    wrapperOffset
  } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [currentAnswers, setCurrentAnswers] = useState(answers)
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  // useEffect(() => {
  //   setCurrentAnswers(answers)
  // }, [answers])

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            <ResponseList formId={id} />
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
