import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { globalStyles } from '../../../../../styles'
import { COLLECTIONS, QUESTION_TYPES } from '../../../../constants'
// import { Button, Divider, Typography } from 'antd'
import { Box } from '@qonsoll/react-design'
import { useKeyPress } from '@umijs/hooks'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FormAdvancedView } from '../../../../domains/Form/components'
import { QuestionAdvancedView } from '../../../../domains/Question/components'
// import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import useFunctions from '../../../../hooks/useFunctions'
import { TranslationContext } from '../../../../context/Translation'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  useAnswersContextDispatch,
  ANSWERS_DISPATCH_EVENTS
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

  // [ADDITIONAL HOOKS]
  useKeyPress(9, (e) => {
    e.preventDefault()
  })

  const [questionsData, loading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS)
      .where('formId', '==', id)
      .orderBy('order')
  )

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState()
  const [previousQuestionOrder, setPreviousQuestionOrder] = useState([])

  // [COMPUTED PROPERTIES]
  const containWelcomeScreen =
    questionsData?.[0]?.questionType === QUESTION_TYPES.WELCOME_SCREEN
  const disabledDown = containWelcomeScreen
    ? currentSlide === questionsData?.length - 1
    : currentSlide === questionsData?.length
  const disabledUp =
    currentSlide === (containWelcomeScreen ? 0 : 1) || disabledDown

  // [CLEAN FUNCTIONS]
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
                    submitLoading={submitLoading}
                    isAnswered={isAnswered}
                    questionsData={questionsData}
                    disabledUp={disabledUp}
                    currentSlide={currentSlide}
                    disabledDown={disabledDown}
                    setIsAnswered={setIsAnswered}
                    setCurrentSlide={setCurrentSlide}
                    previousQuestionOrder={previousQuestionOrder}
                    setPreviousQuestionOrder={setPreviousQuestionOrder}>
                    {questionsData?.map((item, index) => (
                      <Component
                        key={index}
                        onClick={onClick}
                        currentSlide={currentSlide}
                        index={index}
                        item={item}
                        questionsData={questionsData}
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
  item,
  questionsData,
  onClick,
  currentSlide,
  wrapperHeight
}) => {
  const containWelcomeScreen = questionsData?.some(
    (q) => q?.questionType === QUESTION_TYPES.WELCOME_SCREEN
  )
  const questionNumber = containWelcomeScreen ? index : index + 1
  return (
    <Box key={index} height={wrapperHeight} overflowY="auto">
      <QuestionAdvancedView
        wrapperHeight={wrapperHeight}
        data={item}
        questionNumber={questionNumber}
        onClick={onClick}
        currentSlide={currentSlide}
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
