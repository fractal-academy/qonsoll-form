import React from 'react'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { TranslationContext } from '../../../../context/Translation'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ResponseList from '../../../../domains/Response/components/ResponseList'

function FormAnswers(props) {
  const { actions = {}, id, translate, firebase, configurations } = props

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
