import PropTypes from 'prop-types'
import useMedia from 'use-media'
import React, { useState, useEffect, useMemo } from 'react'
import { PageLayout, EditorSidebar, Spinner } from '../../../../components'
import { Box } from '@qonsoll/react-design'
import { TranslationContext } from '../../../../context/Translation'
import { QuestionForm } from '../../../../domains/Question/components'
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
import { message } from 'antd'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import useFunctions from '../../../../hooks/useFunctions'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import { v4 as uuid } from 'uuid'

function FormEdit(props) {
  const {
    firebase,
    actions = {},
    id,
    translations,
    onBack,
    showCondition,
    configurations,
    customQuestionTypes
  } = props

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
  const [brightnessValue, setBrightnessValue] = useState(0)

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
        ? questionsList
            ?.filter((item) => item.questionType === QUESTION_TYPES.ENDING)
            .sort((a, b) => a.order - b.order)
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
    //Bolean conditions
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)

    const isOpinionOrRating = [
      QUESTION_TYPES.OPINION_SCALE,
      QUESTION_TYPES.RATING
    ].includes(key)

    const isYesNo = key === QUESTION_TYPES.YES_NO
    //configuration for certain types of questions
    const defaultConfigurations = {
      answerOption: '',
      redirectQuestion: '',
      answerOptionId: '',
      redirectConditionRule: ''
    }
    const choicesConfiguration = [
      {
        ...defaultConfigurations,
        image: '',
        answerOptionId: uuid(),
        answerOption: 'default'
      }
    ]
    const yesNoConfiguration = [
      {
        ...defaultConfigurations,
        answerOption: 'Yes',
        answerOptionId: uuid()
      },
      {
        ...defaultConfigurations,
        answerOption: 'No',
        answerOptionId: uuid()
      }
    ]
    const opinionAndRatingConfiguration = Array(5)
      .fill(0)
      .map((el, index) => ({
        ...defaultConfigurations,
        answerOption: 1 + index,
        answerOptionId: uuid()
      }))

    //pass data to question configurations depending on question type
    const questionConfigurations = isChoices
      ? choicesConfiguration
      : isYesNo
      ? yesNoConfiguration
      : isOpinionOrRating
      ? opinionAndRatingConfiguration
      : [defaultConfigurations]
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionConfigurations, questionType: key }
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

  // [COMPUTED PROPERTIES]
  const welcomeScreenShowRule = questions?.some(
    (question) => question['questionType'] === QUESTION_TYPES.WELCOME_SCREEN
  )
  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={translations || {}}>
          <TypeformConfigurationContext.Provider value={configurations}>
            {formLoading || questionsListLoading ? (
              <Spinner />
            ) : (
              <Box display="flex" height="inherit" overflowX="hidden">
                <PageLayout
                  id={id}
                  handleSmallScreen={handleSmallScreen}
                  title={form?.title}
                  questionsList={questionsList}
                  onBack={onBack}>
                  <QuestionForm
                    defaultTab={defaultTab}
                    questionsList={questionsList}
                    questionData={currentQuestion}
                    brightnessValue={brightnessValue}
                    onChangeMenuItem={onChangeMenuItem}
                    handleSmallScreen={handleSmallScreen}
                    setBrightnessValue={setBrightnessValue}
                    customQuestionTypes={customQuestionTypes}
                    onQuestionTypeChange={onQuestionTypeChange}
                  />
                </PageLayout>
                {/*TODO id in EditorSidebar*/}
                {handleSmallScreen && (
                  <EditorSidebar
                    transparent
                    id={id}
                    endings={endings}
                    questions={questions}
                    showCondition={showCondition}
                    customQuestionTypes={customQuestionTypes}
                    welcomeScreenShowRule={welcomeScreenShowRule}
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
