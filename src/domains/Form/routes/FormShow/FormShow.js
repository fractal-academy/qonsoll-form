import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
// import { globalStyles } from '../../../../../styles'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
// import { Button, Divider, Typography } from 'antd'
import { Box } from '@qonsoll/react-design'
import { useKeyPress } from '@umijs/hooks'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { FormAdvancedView } from '../../../../domains/Form/components'
import { QuestionAdvancedView } from '../../../../domains/Question/components'
// import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import useFunctions from '../../../../hooks/useFunctions'
import { TranslationContext } from '../../../../context/Translation'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  useAnswersContextDispatch,
  ANSWERS_DISPATCH_EVENTS,
  useAnswersContext
} from '../../../../context/Answers'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'

// const { Title } = Typography
import { ContentCard, Spinner } from '../../../../components'

function FormShow(props) {
  const {
    id,
    firebase,
    translate,
    submitLoading,
    wrapperHeight,
    wrapperOffset,
    configurations,
    actions = {}
  } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef } = useFunctions(firebase)
  const answersDispatch = useAnswersContextDispatch()
  const answersContext = useAnswersContext()

  // [ADDITIONAL HOOKS]
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
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            {loading ? (
              <Spinner />
            ) : (
              <Box height="inherit">
                {/* <Row {...styles.headerRow} noGutters>
                 <Col cw="auto" v="center" p={0}>
                   <Button
                     type="text"
                     size="small"
                     // onClick={() => history.goBack()}
                     icon={<ArrowLeftOutlined />}
                   />
                 </Col>
                 <Col v="center">
                   <Box textAlign="center">
                     <Title level={5}>Live Preview</Title>
                   </Box>
                 </Col>
                 <Col cw="auto" v="center">
                   <Button
                     type="text"
                     size="small"
                     icon={<ReloadOutlined />}
                     onClick={onRestart}>
                     Restart
                   </Button>
                 </Col>
                </Row>

                <Row noGutters>
                 <Col>
                   <Divider style={globalStyles.resetMargin} />
                 </Col>
                </Row> */}

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
                      <Component
                        key={index}
                        index={index}
                        onClick={onClick}
                        question={question}
                        isFormQuiz={formData?.isQuiz}
                        currentSlide={currentSlide}
                        containWelcomeScreen={containWelcomeScreen}
                        answersScoreData={
                          answersScoreData?.find(
                            (scoreItem) =>
                              scoreItem?.questionId === question?.id
                          )?.questionScores
                        }
                      />
                    ))}
                  </FormAdvancedView>
                </ContentCard>
              </Box>
            )}
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

const Component = ({
  index,
  onClick,
  question,
  isFormQuiz,
  currentSlide,
  wrapperHeight,
  answersScoreData,
  containWelcomeScreen
}) => {
  //[COMPUTED PROPERTIES]
  const questionNumber = containWelcomeScreen ? index : index + 1
  return (
    <Box key={index} height={wrapperHeight} overflowY="auto">
      <QuestionAdvancedView
        data={question}
        onClick={onClick}
        isFormQuiz={isFormQuiz}
        currentSlide={currentSlide}
        questionNumber={questionNumber}
        answersScoreData={answersScoreData}
      />
    </Box>
  )
}

FormShow.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  actions: PropTypes.shape({ onFinish: PropTypes.func }),
  submitLoading: PropTypes.bool
}

export default FormShow
