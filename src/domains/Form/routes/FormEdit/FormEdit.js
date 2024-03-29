import { Box, Container, Spin } from '@qonsoll/react-design'
import {
  COLLECTIONS,
  DEFAULT_IMAGE,
  QUESTION_TYPES
} from '../../../../constants'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from '../../../../context/CurrentQuestion'
import { EditorSidebar, PageHeader, ResponseInfo } from '../../../../components'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import FormActions from './FormActions'
import PropTypes from 'prop-types'
import { QuestionForm } from '../../../../domains/Question/components'
import { message } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { v4 as uuid } from 'uuid'

//configuration for certain types of questions
const defaultConfigurations = {
  answerOption: '',
  redirectQuestion: '',
  answerOptionId: '',
  redirectConditionRule: ''
}
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
    customHeader,
    showAnswers,
    onBack,
    customQuestionTypes,
    wrapperPaddings
  } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
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
  const [showDrawer, setShowDrawer] = useState(false)

  // [COMPUTED PROPERTIES]
  const choicesConfiguration = [
    {
      ...defaultConfigurations,
      image: '',
      answerOptionId: uuid(),
      answerOption: 'Default'
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
  const handleDrawerOpen = () => {
    setShowDrawer(!showDrawer)
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

    /*define new order for options when the type of question changes to/from Welcome screen
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
    if (Object.keys(currentQuestion).length) {
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
  const containerPadding = wrapperPaddings || ['24px', '24px', '32px']
  const welcomeScreenShowRule = true

  if (formLoading || questionsListLoading || answerScoresListLoading) {
    return <Spin />
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <Container display="flex" height="inherit" overflowX="hidden">
          <Box
            flex={1}
            display="flex"
            p={containerPadding}
            flexDirection="column">
            {customHeader || (
              <PageHeader
                title={form?.title}
                onBack={onBack}
                actions={
                  <FormActions
                    id={form?.id}
                    showAnswers={showAnswers}
                    showDrawer={handleDrawerOpen}
                  />
                }
              />
            )}

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

            <ResponseInfo />
          </Box>

          <EditorSidebar
            id={id}
            formData={form}
            endings={endings}
            questions={questions}
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            answerScoresData={answerScoresList}
            customQuestionTypes={customQuestionTypes}
            welcomeScreenShowRule={welcomeScreenShowRule}
          />
        </Container>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormEdit.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  actions: PropTypes.object,
  customHeader: PropTypes.node,
  showAnswers: PropTypes.bool,
  customQuestionTypes: PropTypes.array,
  wrapperPaddings: PropTypes.string
}

export default FormEdit
