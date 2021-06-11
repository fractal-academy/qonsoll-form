import PropTypes from 'prop-types'
import useMedia from 'use-media'
import React, { useState, useEffect, useMemo } from 'react'
import {
  PageLayout,
  EditorSidebar,
  Spinner
} from '../../../../components'
import { Box } from '@qonsoll/react-design'
import { TranslationContext } from '../../../../context/Translation'
import {
  QuestionForm,
  QuestionLayoutSwitcher
} from '../../../../domains/Question/components'
import {
  QUESTION_TYPES,
  COLLECTIONS,
  DEFAULT_IMAGE
} from '../../../../constants'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'

import {
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { message, Typography } from 'antd'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import useFunctions from '../../../../hooks/useFunctions'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'

const { Text } = Typography

function FormEdit(props) {
  const { firebase, actions = {}, id, translate, onBack, showCondition,configurations,customQuestionTypes } = props

  // [ADDITIONAL HOOKS]
  const handleSmallScreen = useMedia({ minWidth: '900px' })
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { getCollectionRef, setData } = useFunctions(firebase)
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )

  //[COMPONENT STATE HOOKS]
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)
  const [brightnessValue, setBrightnessValue] = useState(100)

  // [COMPUTED PROPERTIES]
  // divide all tasks of current form into 2 groups
  const questions = useMemo(
    () =>
      questionsList
        ? questionsList?.filter(
            (item) => item.questionType !== QUESTION_TYPES.ENDING
          )
        : [],
    [questionsList]
  )
  const endings = useMemo(
    () =>
      questionsList
        ? questionsList?.filter(
            (item) => item.questionType === QUESTION_TYPES.ENDING
          )
        : [],
    [questionsList]
  )

  // [CLEAN FUNCTIONS]
  const onChangeMenuItem = ({ key }) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: currentQuestion?.image || DEFAULT_IMAGE
      }
    })
  }
  const onQuestionTypeChange = async ({ key }) => {
    //when we change question type on choice or picture choice - set default choice, else empty field
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)
    const questionConfigurations = isChoices
      ? [{ name: 'default', image: '' }]
      : ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionType: key, questionConfigurations }
    })
  }

  // [USE_EFFECTS]
  useEffect(() => {
    !questionsListLoading &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: questionsList?.[0] || {}
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsListLoading])

  useEffect(() => {
    //set default active tab for questionLayout switcher every time when we change current question
    setDefaultTab(currentQuestion?.layoutType)
    //save data of current question to database, when it change
    !!Object.keys(currentQuestion).length &&
      setData(
        COLLECTIONS.QUESTIONS,
        currentQuestion?.id,
        currentQuestion
      ).catch((e) => message.error(e.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion])

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>

          {formLoading || questionsListLoading ? (
            <Spinner />
          ) : (
            <Box display="flex" height="inherit" overflowX="hidden">
              <PageLayout handleSmallScreen={handleSmallScreen} title={form?.title}>
                <QuestionForm
                  data={currentQuestion}
                  defaultTab={defaultTab}
                  brightnessValue={brightnessValue}
                  onChangeMenuItem={onChangeMenuItem}
                  handleSmallScreen={handleSmallScreen}
                  customQuestionTypes={customQuestionTypes}
                  setBrightnessValue={setBrightnessValue}
                  onQuestionTypeChange={onQuestionTypeChange}
                />
              </PageLayout>
              {/*TODO id in EditorSidebar*/}
              {handleSmallScreen && (
                <EditorSidebar
                  transparent
                  endings={endings}
                  questions={questions}
                  customQuestionTypes={customQuestionTypes}
                />
              )}
            </Box>
          )}
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormEdit.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  showCondition: PropTypes.bool,
  configurations: PropTypes.object
}

export default FormEdit
