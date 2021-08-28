import useMedia from 'use-media'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { Typography, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { Box, Container } from '@qonsoll/react-design'
import useFunctions from '../../../../hooks/useFunctions'
import React, { useState, useEffect, useMemo } from 'react'
import { QuestionForm } from '../../../../domains/Question/components'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import { EditorSidebar, Spinner, PageHeader } from '../../../../components'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  useTranslation,
  TranslationContext
} from '../../../../context/Translation'
import {
  QUESTION_TYPES,
  COLLECTIONS,
  DEFAULT_IMAGE
} from '../../../../constants'
import {
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../../context/CurrentQuestion'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

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
  ?.map((_, index) => ({
    ...defaultConfigurations,
    answerOption: 1 + index,
    answerOptionId: uuid()
  }))

function FormEdit(props) {
  const {
    id,
    firebase,
    actions = {},
    onBack,
    hideResults,
    translations,
    showCondition,
    configurations,
    customQuestionTypes
  } = props

  //[CUSTOM HOOKS]
  const { screenSizeWarning } = useTranslation()

  // [ADDITIONAL HOOKS]
  const smallScreen = useMedia({ minWidth: '769px' })
  const currentQuestion = useCurrentQuestionContext()
  const history = useHistory()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  const { getCollectionRef, setData } = useFunctions(firebase)

  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS)
      .where('formId', '==', id)
      .orderBy('order')
  )
  const [answerScoresList, answerScoresListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.ANSWERS_SCORES_CONDITIONS).where(
      'formId',
      '==',
      id
    )
  )

  //[COMPONENT STATE HOOKS]
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)
  const [brightnessValue, setBrightnessValue] = useState(0)
  const [currentQuestionId, setCurrentQuestionId] = useState()

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
  const onQuestionLayoutChange = ({ key }) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: currentQuestion?.image || DEFAULT_IMAGE
      }
    })
  }

  const onQuestionTypeChange = async ({ key }) => {
    //conditions to check if current question type changes to/from Welcome screen type
    const isChangeFromWelcomeScreen =
      currentQuestion?.questionType === QUESTION_TYPES.WELCOME_SCREEN
    const isChangeToWelcomeScreen = key === QUESTION_TYPES.WELCOME_SCREEN

    //Boolean conditions to find out on what type of question changes current question
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)

    const isOpinionOrRating = [
      QUESTION_TYPES.OPINION_SCALE,
      QUESTION_TYPES.RATING
    ].includes(key)

    const isYesNo = key === QUESTION_TYPES.YES_NO

    //define question configurations depending on question type
    const questionConfigurations = isChoices
      ? choicesConfiguration
      : isYesNo
      ? yesNoConfiguration
      : isOpinionOrRating
      ? opinionAndRatingConfiguration
      : [defaultConfigurations]

    /*define new order for options when the type of question changes to/from Welocome screen
      if changes from Welcome screen type order will be 1, else if changes to welcome screen order will be - 0*/
    const updatedOrder = isChangeFromWelcomeScreen ? 1 : 0
    /* updated data for current question,
       if question type changes on/from welcome screen - set updated order,
       in other ways we don`t change it*/
    const updatedCurrentQuestionData = {
      questionConfigurations,
      questionType: key,
      isRequired: false,
      order:
        isChangeFromWelcomeScreen || isChangeToWelcomeScreen
          ? updatedOrder
          : currentQuestion?.order
    }
    //update current question data
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: updatedCurrentQuestionData
    })

    if (isChangeFromWelcomeScreen || isChangeToWelcomeScreen) {
      //if question type changed to/from welcome screen
      //define questions array without current question, as its data has already been updated
      const filteredQuestions = questionsList?.filter(
        (item) => item?.id !== currentQuestion?.id
      )

      //update other question order for correct behaviour of questions
      filteredQuestions?.forEach((question, index) => {
        setData(COLLECTIONS.QUESTIONS, question?.id, {
          order: isChangeToWelcomeScreen ? index + 1 : index + 2
        })
      })
    }
  }

  // [USE_EFFECTS]
  useEffect(() => {
    /*Determine default current question, when questions upload
      set current question from local storage
      to prevent reset to another current question after page reload,
      if there is no current question in local storage set first from list*/
    const questionIdFromStorage = JSON.parse(
      localStorage.getItem('currentQuestion')
    )
    setCurrentQuestionId(questionIdFromStorage)
    //search question from storage by id
    const defaultCurrentQuestion = questionsList?.filter(
      (item) => item?.id === questionIdFromStorage
    )?.[0]

    //set default current question
    !questionsListLoading &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: defaultCurrentQuestion || questionsList?.[0] || {}
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsListLoading])

  useEffect(() => {
    //set default active tab for questionLayout switcher every time when we change current question
    setDefaultTab(currentQuestion?.layoutType)

    //check if question was changed to another or only its data
    const isAnotherQuestion =
      currentQuestion?.id !==
      (currentQuestionId || JSON.parse(localStorage.getItem('currentQuestion')))

    //save data of current question to database, when its data was changed
    !!Object.keys(currentQuestion).length &&
      !isAnotherQuestion &&
      setData(
        COLLECTIONS.QUESTIONS,
        currentQuestion?.id,
        currentQuestion
      ).catch((e) => message.error(e.message))

    //save actual current question data to storage
    if (!!Object.keys(currentQuestion).length) {
      localStorage.setItem(
        'currentQuestion',
        JSON.stringify(currentQuestion?.id)
      )

      //set question id in state
      setCurrentQuestionId(currentQuestion?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion])

  // [COMPUTED PROPERTIES]
  const containerPadding = smallScreen ? 4 : 2
  const welcomeScreenShowRule = questions?.some(
    (question) => question['questionType'] === QUESTION_TYPES.WELCOME_SCREEN
  )

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={translations || {}}>
          <TypeformConfigurationContext.Provider value={configurations}>
            {formLoading || questionsListLoading || answerScoresListLoading ? (
              <Spinner />
            ) : (
              <Container display="flex" height="inherit" overflowX="hidden">
                <Box
                  flex={1}
                  p={containerPadding}
                  display="flex"
                  flexDirection="column">
                  <PageHeader
                    id={id}
                    handlesPreview
                    title={form?.title}
                    hideResults={hideResults}
                    smallScreen={smallScreen}
                    onBack={onBack || history.goBack}
                  />
                  {smallScreen ? (
                    <QuestionForm
                      defaultTab={defaultTab}
                      questionsList={questionsList}
                      questionData={currentQuestion}
                      brightnessValue={brightnessValue}
                      setBrightnessValue={setBrightnessValue}
                      customQuestionTypes={customQuestionTypes}
                      onQuestionTypeChange={onQuestionTypeChange}
                      welcomeScreenShowRule={welcomeScreenShowRule}
                      onQuestionLayoutChange={onQuestionLayoutChange}
                    />
                  ) : (
                    <Box
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center">
                      <Typography>
                        {screenSizeWarning ||
                          'This feature is available only on desktop.'}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {smallScreen && (
                  <EditorSidebar
                    transparent
                    id={id}
                    formData={form}
                    endings={endings}
                    questions={questions}
                    showCondition={showCondition}
                    answerScoresData={answerScoresList}
                    customQuestionTypes={customQuestionTypes}
                    welcomeScreenShowRule={welcomeScreenShowRule}
                  />
                )}
              </Container>
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
