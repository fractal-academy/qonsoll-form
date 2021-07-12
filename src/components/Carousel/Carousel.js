import PropTypes from 'prop-types'
import { useSize } from '@umijs/hooks'
import { QUESTION_TYPES } from '../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Carousel as AntdCarousel } from 'antd'
import { useAnswersContext } from '../../context/Answers'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import React, { cloneElement, useRef } from 'react'

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
    sortedData,
    previousQuestionOrder
  } = props

  // [STATE HOOKS]

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()
  const answersContext = useAnswersContext()

  const [{ height }, ref] = useSize()
  const [{ height: buttonsHeight }, buttonsRef] = useSize()

  // [CLEAN FUNCTIONS]
  const onCurrentSlideChange = (slideIndex) => {
    const isContainWelcomeScreen = sortedData?.some(
      (question) => question?.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )

    setCurrentSlide(isContainWelcomeScreen ? slideIndex : slideIndex + 1)
  }

  //[ LOGIC JUMPS ]
  const goTo = (slideNumber) => {
    carouselRef.current?.goTo(slideNumber)
    setIsAnswered && setIsAnswered(false)
  }
  const previous = () => {
    // carouselRef.current?.prev()
    carouselRef.current?.goTo(previousQuestionOrder)
  }
  const next = () => {
    carouselRef.current?.next()
    setIsAnswered && setIsAnswered(false)
  }
  const handleScroll = (e) => {
    // return this after adding isRequired and condition rules
    // e.deltaY > 0 ? next() : previous()
  }

  // [ ANSWER ]
  let currentSlideData = sortedData?.filter(
    (item) => item.order === currentSlide
  )
  let givenAnswer =
    answersContext &&
    Object.entries(answersContext)?.filter(
      (item) => item[0] === currentSlideData[0]?.id
    )
  let answerValue =
    givenAnswer && Object.entries(givenAnswer)[0]?.[1][1]?.answer?.value

  // [ TYPE FUNCTIONS ]
  const choiceSlideNextNumber = () => {
    let questionConfig =
      currentSlideData &&
      currentSlideData[0]?.questionConfigurations?.filter(
        (item) => item.answerOption === answerValue
      )
    let nextOrder = questionConfig
      ? sortedData?.filter(
          (item) => item.id === questionConfig[0]?.redirectQuestion
        )[0]?.order
      : 0

    ;(nextOrder && goTo(nextOrder)) || next()
  }
  const textSlideNextNumber = () => {
    goTo()
  }
  const specialSlideNextNumber = () => {
    goTo()
  }

  //COMPUTED PROPERTIES
  // const initialSlide = sortedData.some(
  //   (question) => question.questionType === QUESTION_TYPES.WELCOME_SCREEN
  // )
  //   ? 0
  //   : 1

  const actionRuleMap = {
    // [ CHOICES ]
    [QUESTION_TYPES.CHOICE]: {
      function: () => choiceSlideNextNumber
    },
    [QUESTION_TYPES.YES_NO]: {
      function: () => choiceSlideNextNumber
    },
    [QUESTION_TYPES.RATING]: {
      function: () => choiceSlideNextNumber
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      function: () => choiceSlideNextNumber
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      function: () => choiceSlideNextNumber
    },

    // [ TEXT ]
    [QUESTION_TYPES.SHORT_TEXT]: {
      function: () => textSlideNextNumber
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      function: () => textSlideNextNumber
    },

    // [ SPECIAL ]
    [QUESTION_TYPES.DATE]: {
      function: () => specialSlideNextNumber
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      function: () => specialSlideNextNumber
    }
  }

  isAnswered && choiceSlideNextNumber()

  return (
    <Box onWheel={handleScroll} height="100%" ref={ref} width="100%">
      <AntdCarousel
        dots={false}
        // initialSlide={initialSlide}
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
      {!submitLoading && (
        <Box ref={buttonsRef}>
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
        </Box>
      )}
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
