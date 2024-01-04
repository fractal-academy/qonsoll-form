import {
  ANSWERS_DISPATCH_EVENTS,
  useAnswersContext,
  useAnswersContextDispatch
} from '../../../../context/Answers'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
import { ContentCard, PageHeader, Spinner } from '../../../../components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import { FormAdvancedView } from '../../../../domains/Form/components'
import FormShowHeightWrapper from './FormShowHeightWrapper'
import PropTypes from 'prop-types'
import { TranslationContext } from '../../../../context/Translation'
import useFunctions from '../../../../hooks/useFunctions'
import { useKeyPress } from '@umijs/hooks'
import { useNavigate } from 'react-router-dom'

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
    preventFirebaseUsage,
    showHeader,
    noFirebaseForm,
    noFirebaseQuestions,
    noFirebaseAnswersScore
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answersDispatch = useAnswersContextDispatch()
  const answersContext = useAnswersContext()

  // [ADDITIONAL HOOKS]
  const navigate = useNavigate()
  useKeyPress(9, (e) => {
    e.preventDefault()
  })

  const [questionsData, loading] = useCollectionData(
    firebase &&
      getCollectionRef(COLLECTIONS.QUESTIONS)
        .where('formId', '==', id)
        .orderBy('order')
  )
  const questionsDataChoosen = noFirebaseQuestions || questionsData

  const [answersScoreData] = useCollectionData(
    firebase &&
      getCollectionRef(COLLECTIONS.ANSWERS_SCORES_CONDITIONS).where(
        'formId',
        '==',
        id
      )
  )
  const answersScoreDataChoosen = noFirebaseAnswersScore || answersScoreData

  const [formData] = useDocumentData(
    firebase && getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const formDataChoosen = noFirebaseForm || formData

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState()
  const [previousQuestionOrder, setPreviousQuestionOrder] = useState([])

  // [COMPUTED PROPERTIES]
  const containerPadding = wrapperPaddings || ['24px', '24px', '32px']
  const filteredQuestionsList = useMemo(
    () =>
      questionsDataChoosen?.filter(
        (item) => item?.questionType !== QUESTION_TYPES.ENDING
      ),
    [questionsDataChoosen]
  )

  const questionsWithEndingLength = useMemo(
    () =>
      questionsDataChoosen?.filter(
        (item) => item?.questionType !== QUESTION_TYPES.ENDING
      )?.length + 1,
    [questionsDataChoosen]
  )
  const endings = useMemo(
    () =>
      questionsDataChoosen?.filter(
        (item) => item?.questionType === QUESTION_TYPES.ENDING
      ),
    [questionsDataChoosen]
  )
  const answersId = useMemo(() => {
    const filteredAnswerContext = Object.values(answersContext)

    !!filteredAnswerContext?.length &&
      filteredAnswerContext.filter((item) => item?.answerId)
    return filteredAnswerContext
  }, [answersContext])

  const containWelcomeScreen = useMemo(
    () =>
      questionsDataChoosen?.[0]?.questionType === QUESTION_TYPES.WELCOME_SCREEN,
    [questionsDataChoosen]
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
  const determineEnding = useCallback(() => {
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

        if (
          answersId.some(
            (item) => item?.answerId === endingConfiguration?.answerOptionId
          )
        ) {
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
  }, [answersId, endings, filteredQuestionsList])

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
    if (!loading && questionsDataChoosen) {
      //when data loaded from db, set default currentSlide value according to questions data
      const firstSlideRule = containWelcomeScreen ? 0 : 1
      setCurrentSlide(firstSlideRule)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, questionsDataChoosen])
  useEffect(() => {
    // when questions was uploaded, its last one question without ending
    // and we got answer for this question
    if (!loading && isLastQuestionWithoutEndings && isAnswered) {
      //calculate ending
      determineEnding()
    }
  }, [isLastQuestionWithoutEndings, isAnswered, loading, determineEnding])

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={translations || {}}>
          {loading ? (
            <Spinner />
          ) : (
            <div
              height="100%"
              display="flex"
              flexDirection="column"
              p={containerPadding}
            >
              {showHeader && <PageHeader id={id} onBack={navigate(-1)} />}
              <ContentCard
                topOffset={wrapperOffset}
                wrapperHeight={wrapperHeight}
              >
                <FormAdvancedView
                  isAnswered={isAnswered}
                  disabledUp={disabledUp}
                  currentSlide={currentSlide}
                  disabledDown={disabledDown}
                  setIsAnswered={setIsAnswered}
                  questionsData={questionsDataChoosen}
                  setCurrentSlide={setCurrentSlide}
                  containWelcomeScreen={containWelcomeScreen}
                  previousQuestionOrder={previousQuestionOrder}
                  setPreviousQuestionOrder={setPreviousQuestionOrder}
                >
                  {filteredQuestionsList?.map((question, index) => (
                    <FormShowHeightWrapper
                      key={index}
                      index={index}
                      onClick={onClick}
                      question={question}
                      submitLoading={submitLoading}
                      isFormQuiz={formDataChoosen?.isQuiz}
                      currentSlide={currentSlide}
                      preventFirebaseUsage={preventFirebaseUsage}
                      containWelcomeScreen={containWelcomeScreen}
                      answersScoreData={
                        answersScoreDataChoosen?.find(
                          (scoreItem) => scoreItem?.questionId === question?.id
                        )?.questionScores
                      }
                    />
                  ))}
                </FormAdvancedView>
              </ContentCard>
            </div>
          )}
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormShow.propTypes = {
  id: PropTypes.string.isRequired,
  firebase: PropTypes.object,
  submitLoading: PropTypes.bool,
  wrapperHeight: PropTypes.number,
  wrapperOffset: PropTypes.number,
  actions: PropTypes.shape({ onFinish: PropTypes.func }),
  translations: PropTypes.object,
  wrapperPaddings: PropTypes.string,
  preventFirebaseUsage: PropTypes.bool,
  showHeader: PropTypes.bool,
  noFirebaseForm: PropTypes.object,
  noFirebaseQuestions: PropTypes.array,
  noFirebaseAnswersScore: PropTypes.array
}

export default FormShow
