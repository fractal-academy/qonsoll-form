import PropTypes from 'prop-types'
import { useSize } from '@umijs/hooks'
import { QUESTION_TYPES } from '../../constants'
import React, { cloneElement, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Carousel as AntdCarousel } from 'antd'
import { useAnswersContext } from '../../context/Answers'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import {
  longAndShortAnswerConditionComparison,
  dateAnswerConditionComparison
} from '../../domains/Form/helpers'

function Carousel(props) {
  const {
    children,
    isAnswered,
    setIsAnswered,
    currentSlide,
    setCurrentSlide,
    submitLoading,
    disabledDown,
    disabledUp,
    questionsData,
    previousQuestionOrder,
    setPreviousQuestionOrder
  } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()
  const answersContext = useAnswersContext()

  const [{ height }, ref] = useSize()
  const [{ height: buttonsHeight }, buttonsRef] = useSize()

  // [CLEAN FUNCTIONS]
  const onCurrentSlideChange = (slideIndex) => {
    const containWelcomeScreen = questionsData?.some(
      (question) => question?.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )

    setCurrentSlide(containWelcomeScreen ? slideIndex : slideIndex + 1)
  }

  const welcomeScreenRule = questionsData?.some(
    (item) => item.questionType === QUESTION_TYPES.WELCOME_SCREEN
  )

  //[ LOGIC JUMPS ]
  const goTo = (slideNumber) => {
    carouselRef.current?.goTo(slideNumber)
    setIsAnswered && setIsAnswered(false)
  }
  const next = () => {
    carouselRef.current?.next()
    setIsAnswered && setIsAnswered(false)
  }
  const previous = () => {
    carouselRef.current?.goTo(
      previousQuestionOrder[previousQuestionOrder.length - 1]
    )

    let temp = previousQuestionOrder.filter(
      (item, index) => index < previousQuestionOrder.length - 1
    )
    setPreviousQuestionOrder(temp)
  }

  // [ ANSWER ]
  let currentSlideData = questionsData?.filter(
    (item) => item.order === currentSlide
  )
  let questionConfig =
    currentSlideData && currentSlideData[0]?.questionConfigurations
  let givenAnswer =
    answersContext &&
    Object.entries(answersContext)?.filter(
      (item) => item[0] === currentSlideData[0]?.id
    )
  let answerValue =
    givenAnswer && Object.entries(givenAnswer)[0]?.[1][1]?.answer?.value

  const getNextSlide = (config) => {
    let nextOrder = config
      ? questionsData?.filter(
          (item) => item.id === config[0]?.redirectQuestion
        )[0]?.order
      : 0

    const ruledOrder = welcomeScreenRule ? nextOrder : nextOrder - 1

    ;(ruledOrder && goTo(ruledOrder)) || next()
  }

  // [ TYPE FUNCTIONS ]
  const choiceSlideNextNumber = () => {
    let filteredConfig = questionConfig?.filter(
      (item) => item.answerOption === answerValue
    )

    getNextSlide(filteredConfig)
  }
  const textSlideNextNumber = () => {
    let filteredConfig = questionConfig?.filter((item) =>
      longAndShortAnswerConditionComparison(
        item?.redirectConditionRule,
        answerValue,
        item?.answerOption
      )
    )
    getNextSlide(filteredConfig)
  }

  const dateSlideNextNumber = () => {
    let filteredConfig = questionConfig?.filter((item) =>
      dateAnswerConditionComparison(
        item?.redirectConditionRule,
        item?.answerOption,
        answerValue
      )
    )
    getNextSlide(filteredConfig)
  }
  const uploadSlideNextNumber = () => {
    answerValue ? getNextSlide(questionConfig) : next()
  }

  const actionRuleMap = {
    // [ CHOICES ]
    [QUESTION_TYPES.CHOICE]: choiceSlideNextNumber,
    [QUESTION_TYPES.YES_NO]: choiceSlideNextNumber,
    [QUESTION_TYPES.RATING]: choiceSlideNextNumber,
    [QUESTION_TYPES.OPINION_SCALE]: choiceSlideNextNumber,
    [QUESTION_TYPES.PICTURE_CHOICE]: choiceSlideNextNumber,

    // [ TEXT ]
    [QUESTION_TYPES.SHORT_TEXT]: textSlideNextNumber,
    [QUESTION_TYPES.LONG_TEXT]: textSlideNextNumber,

    // [ SPECIAL ]
    [QUESTION_TYPES.DATE]: dateSlideNextNumber,
    [QUESTION_TYPES.FILE_UPLOAD]: uploadSlideNextNumber
  }

  const typeAction =
    (currentSlideData && actionRuleMap[currentSlideData[0]?.questionType]) ||
    next

  isAnswered && typeAction()

  return (
    <Box height="100%" ref={ref} width="100%">
      <AntdCarousel
        dots={false}
        swipe={false}
        adaptiveHeight
        ref={carouselRef}
        dotPosition="right"
        afterChange={onCurrentSlideChange}
        infinite={false}>
        {children?.map((el, index) =>
          cloneElement(el, {
            wrapperHeight: height - buttonsHeight,
            key: index
          })
        )}
      </AntdCarousel>
      <Box ref={buttonsRef}>
        {!submitLoading && (
          <Row h="right" p={2} noGutters>
            <Col cw="auto" mr={2}>
              <Button
                disabled={disabledUp}
                type="primary"
                onClick={previous}
                onMouseDown={(e) => e.preventDefault()}>
                <UpOutlined />
              </Button>
            </Col>
            <Col cw="auto">
              <Button
                disabled={disabledDown}
                type="primary"
                onClick={next}
                onMouseDown={(e) => e.preventDefault()}>
                <DownOutlined />
              </Button>
            </Col>
          </Row>
        )}
      </Box>
    </Box>
  )
}

Carousel.propTypes = {
  children: PropTypes.node,
  isAnswered: PropTypes.bool,
  setIsAnswered: PropTypes.func,
  setCurrentSlide: PropTypes.func
}

export default Carousel
