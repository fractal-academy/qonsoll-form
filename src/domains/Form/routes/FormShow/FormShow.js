import useMedia from 'use-media'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '@qonsoll/react-design'
import { useKeyPress } from '@umijs/hooks'
import useFunctions from '../../../../hooks/useFunctions'
import React, { useState, useEffect, useMemo } from 'react'
import FormShowHeightWrapper from './FormShowHeightWrapper'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { TranslationContext } from '../../../../context/Translation'
import { FormAdvancedView } from '../../../../domains/Form/components'
import { ContentCard, Spinner, PageHeader } from '../../../../components'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  useAnswersContextDispatch,
  ANSWERS_DISPATCH_EVENTS,
  useAnswersContext
} from '../../../../context/Answers'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

function FormShow(props) {
  const {
    id,
    firebase,
    translations,
    submitLoading,
    wrapperHeight,
    wrapperOffset,
    actions = {},
    wrapperPaddings,
    showHeader
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answersDispatch = useAnswersContextDispatch()
  const answersContext = useAnswersContext()

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const smallScreen = useMedia({ minWidth: '769px' })
  useKeyPress(9, (e) => {
    e.preventDefault()
  })

  const [questionsData, loading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS)
      .where('formId', '==', id)
      .orderBy('order')
  )
  const [answersScoreData] = useCollectionData(
    getCollectionRef(COLLECTIONS.ANSWERS_SCORES_CONDITIONS).where(
      'formId',
      '==',
      id
    )
  )
  const [formData] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState()
  const [previousQuestionOrder, setPreviousQuestionOrder] = useState([])

  // [COMPUTED PROPERTIES]
  const containerPadding =
    wrapperPaddings !== undefined ? wrapperPaddings : smallScreen ? 4 : 2
  const filteredQuestionsList = useMemo(
    () =>
      questionsData?.filter(
        (item) => item?.questionType !== QUESTION_TYPES.ENDING
      ),
    [questionsData]
  )
  const questionsWithEndingLength = useMemo(
    () =>
      questionsData?.filter(
        (item) => item?.questionType !== QUESTION_TYPES.ENDING
      )?.length + 1,
    [questionsData]
  )
  const endings = useMemo(
    () =>
      questionsData?.filter(
        (item) => item?.questionType === QUESTION_TYPES.ENDING
      ),
    [questionsData]
  )
  const answersId = useMemo(
    () =>
      !!Object.values(answersContext).length
        ? Object.values(answersContext).map((item) => {
            if (item?.answerId) return item?.answerId
          })
        : [],
    [answersContext]
  )
  const containWelcomeScreen = useMemo(
    () => questionsData?.[0]?.questionType === QUESTION_TYPES.WELCOME_SCREEN,
    [questionsData]
  )
  const disabledDown =
    currentSlide ===
    (containWelcomeScreen
      ? questionsWithEndingLength - 1
      : questionsWithEndingLength)
  const disabledUp =
    currentSlide === (containWelcomeScreen ? 0 : 1) || disabledDown
  const isLastQuestionWithoutEndings =
    currentSlide ===
    (containWelcomeScreen
      ? filteredQuestionsList?.length - 1
      : filteredQuestionsList?.length)

  // [CLEAN FUNCTIONS]
  //function that calculate what ending will be displayed
  const determineEnding = () => {
    let maxMatches = 0
    let tempMatches = 0
    //by default first ending will be displayed
    let computedEnding = endings?.[0]
    //pass through all the endings
    endings?.forEach((ending) => {
      const { questionConfigurations } = ending
      //map all configurations for all endings
      questionConfigurations?.forEach((endingConfiguration) => {
        //if ending configuration contain answer options id
        //check if the context holds answer what was selected for ending
        if (answersId.includes(endingConfiguration?.answerOptionId)) {
          //increment matches of ending configurations with answers
          tempMatches++
        }
      })
      //if there are more matches for current(mapped) ending than for previous ending
      if (tempMatches > maxMatches) {
        //define new ending
        computedEnding = ending
        //update max matches value
        maxMatches = tempMatches
        //reset temporary matches
        tempMatches = 0
      }
    })
    //add computed ending to other questions
    filteredQuestionsList.push(computedEnding)
  }

  const onClick = (answerData) => {
    !!answerData &&
      answersDispatch({
        type: ANSWERS_DISPATCH_EVENTS.ADD_ANSWER,
        payload: answerData
      })

    setIsAnswered(true)
    setPreviousQuestionOrder((prevState) =>
      // index: containWelcomeScreen ? questionsData?.length - 1 : questionsData?.length
      prevState?.[prevState?.length - 1] !== currentSlide
        ? [...(prevState || []), currentSlide]
        : prevState || []
    )
  }

  // [USE EFFECTS]
  useEffect(() => {
    if (!loading && questionsData) {
      //when data loaded from db, set default currentSlide value according to questions data
      const firstSlideRule = containWelcomeScreen ? 0 : 1
      setCurrentSlide(firstSlideRule)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, questionsData])
  useEffect(() => {
    // when questions was uploaded, its last one question without ending
    // and we got answer for this question
    if (!loading && isLastQuestionWithoutEndings && isAnswered) {
      //calculate ending
      determineEnding()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastQuestionWithoutEndings, isAnswered])
  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={translations || {}}>
          {loading ? (
            <Spinner />
          ) : (
            <Container
              height="100%"
              display="flex"
              flexDirection="column"
              p={containerPadding}>
              {showHeader && (
                <PageHeader
                  id={id}
                  handlesPreview
                  smallScreen={smallScreen}
                  onBack={history.goBack}
                />
              )}
              <ContentCard
                topOffset={wrapperOffset}
                wrapperHeight={wrapperHeight}>
                <FormAdvancedView
                  isAnswered={isAnswered}
                  disabledUp={disabledUp}
                  currentSlide={currentSlide}
                  disabledDown={disabledDown}
                  submitLoading={submitLoading}
                  setIsAnswered={setIsAnswered}
                  questionsData={questionsData}
                  setCurrentSlide={setCurrentSlide}
                  containWelcomeScreen={containWelcomeScreen}
                  previousQuestionOrder={previousQuestionOrder}
                  setPreviousQuestionOrder={setPreviousQuestionOrder}>
                  {filteredQuestionsList?.map((question, index) => (
                    <FormShowHeightWrapper
                      key={index}
                      index={index}
                      onClick={onClick}
                      question={question}
                      isFormQuiz={formData?.isQuiz}
                      currentSlide={currentSlide}
                      containWelcomeScreen={containWelcomeScreen}
                      answersScoreData={
                        answersScoreData?.find(
                          (scoreItem) => scoreItem?.questionId === question?.id
                        )?.questionScores
                      }
                    />
                  ))}
                </FormAdvancedView>
              </ContentCard>
            </Container>
          )}
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormShow.propTypes = {
  id: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  firebase: PropTypes.object.isRequired,
  translate: PropTypes.object,
  submitLoading: PropTypes.bool,
  wrapperHeight: PropTypes.number,
  wrapperOffset: PropTypes.number,
  configurations: PropTypes.object,
  actions: PropTypes.shape({ onFinish: PropTypes.func })
}

export default FormShow
