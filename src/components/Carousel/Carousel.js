import {
  ANSWERS_DISPATCH_EVENTS,
  useAnswersContext,
  useAnswersContextDispatch
} from '../../context/Answers'
import { Carousel as AntdCarousel, message } from 'antd'
import { Box, Button, Col, Row } from '@qonsoll/react-design'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import React, { cloneElement, useEffect, useRef } from 'react'
import {
  dateAnswerConditionComparison,
  longAndShortAnswerConditionComparison
} from '../../domains/Form/helpers'
import { useKeyPress, useSize } from '@umijs/hooks'

import PropTypes from 'prop-types'
import { QUESTION_TYPES } from '../../constants'
import { useTranslations } from '@qonsoll/translation'

function Carousel(props) {
  const {
    children,
    disabledUp,
    isAnswered,
    disabledDown,
    currentSlide,
    setIsAnswered,
    questionsData,
    setCurrentSlide,
    containWelcomeScreen,
    previousQuestionOrder,
    setPreviousQuestionOrder
  } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()
  const answersContext = useAnswersContext()
  const answersContextDispatch = useAnswersContextDispatch()
  const { t } = useTranslations()

  const [{ height }, ref] = useSize()
  const [{ height: buttonsHeight }, buttonsRef] = useSize()

  // [CLEAN FUNCTIONS]
  const onCurrentSlideChange = (slideIndex) => {
    setCurrentSlide(containWelcomeScreen ? slideIndex : slideIndex + 1)
  }

  // Native react slick function.
  const goTo = (slideNumber) => {
    carouselRef.current?.goTo(slideNumber)

    // Influences on selected answer button style.
    setIsAnswered && setIsAnswered(false)
  }

  const next = async (skipButtonEvent) => {
    if (currentSlideData?.isRequired && skipButtonEvent) {
      message.error(t('The answer is required'))
    } else {
      const isAnswerExists = !!answerValue
      const isWelcomeScreen =
        currentSlideData?.questionType === QUESTION_TYPES.WELCOME_SCREEN

      //check if carousel navigation button was pressed, to avoid repetition in answers context
      if (skipButtonEvent && !isAnswerExists && !isWelcomeScreen) {
        await setIsAnswered(true)
        //form the answer according to the answers context structure
        const answerData = {
          question: currentSlideData,
          answer: { value: '' }
        }
        //set empty answer to answers
        answersContextDispatch({
          type: ANSWERS_DISPATCH_EVENTS.ADD_ANSWER,
          payload: answerData
        })
      }
      carouselRef.current?.next()
      setIsAnswered?.(false)
    }
  }

  const previous = () => {
    carouselRef.current?.goTo(
      previousQuestionOrder[previousQuestionOrder.length - 1]
    )

    const temp =
      previousQuestionOrder?.[previousQuestionOrder.length - 1] ===
      currentSlide - 1
        ? previousQuestionOrder?.filter(
            (_, index) => index < previousQuestionOrder.length - 1
          )
        : previousQuestionOrder

    setPreviousQuestionOrder(temp)
  }

  const handleNextClick = (e) => {
    // Check if function 'next' can be called
    // Prevents skipping
    setPreviousQuestionOrder((prevState) =>
      prevState?.[prevState?.length - 1] !== currentSlide
        ? [...(prevState || []), currentSlide]
        : prevState || []
    )
    next(e)
  }

  useKeyPress(
    38,
    (event) => event.type === 'keyup' && !disabledUp && previous(),
    { events: ['keydown', 'keyup'] }
  )
  useKeyPress(
    40,
    (event) =>
      event.type === 'keyup' && !disabledDown && handleNextClick(event),
    { events: ['keydown', 'keyup'] }
  )
  // [ ANSWER ]
  const currentSlideData = questionsData?.filter(
    (item) => item.order === currentSlide
  )?.[0]

  const questionConfig = currentSlideData?.questionConfigurations
  const givenAnswer =
    answersContext &&
    Object.entries(answersContext)?.filter(
      (item) => item[0] === currentSlideData?.id
    )
  const answerValue =
    givenAnswer && Object.entries(givenAnswer)[0]?.[1][1]?.answer?.value

  const getNextSlide = (config) => {
    const nextOrder = config
      ? questionsData?.filter(
          (item) => item.id === config[0]?.redirectQuestion
        )[0]?.order
      : 0

    const ruledOrder = containWelcomeScreen ? nextOrder : nextOrder - 1

    ruledOrder ? goTo(ruledOrder) : next()
  }

  // [ TYPE FUNCTIONS ]
  const choiceSlideNextNumber = () => {
    const filteredConfig = questionConfig?.filter(
      (item) => item.answerOption === answerValue
    )

    getNextSlide(filteredConfig)
  }
  const textSlideNextNumber = () => {
    const filteredConfig = questionConfig?.filter((item) =>
      longAndShortAnswerConditionComparison(
        item?.redirectConditionRule,
        answerValue,
        item?.answerOption
      )
    )
    getNextSlide(filteredConfig)
  }

  const dateSlideNextNumber = () => {
    const filteredConfig = questionConfig?.filter((item) =>
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

  const typeAction = actionRuleMap[currentSlideData?.questionType] || next

  useEffect(() => {
    isAnswered && typeAction()
  }, [isAnswered, typeAction])

  return (
    <Box ref={ref} height="100%" width="100%" position="relative">
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
      <Box ref={buttonsRef} position="absolute" bottom="0" right="0">
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
              onClick={handleNextClick}
              onMouseDown={(e) => e.preventDefault()}>
              <DownOutlined />
            </Button>
          </Col>
        </Row>
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
