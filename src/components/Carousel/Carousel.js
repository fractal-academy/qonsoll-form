import useMedia from 'use-media'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSize } from '@umijs/hooks'
import { QUESTION_TYPES } from '../../constants'
import typeformTheme from '../../../styles/theme'
import React, { cloneElement, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Carousel as AntdCarousel } from 'antd'
import { useAnswersContext } from '../../context/Answers'
import {
  UpOutlined,
  DownOutlined,
  DoubleRightOutlined
} from '@ant-design/icons'

const SecondIcon = styled(DoubleRightOutlined)`
  margin-left: -5px;
`

const PromptBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0;
  padding: 4px;
  position: absolute;
  background-color: ${({ theme }) =>
    theme?.color?.white?.t?.lighten2 ||
    typeformTheme?.color?.white?.t?.lighten2};
`

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
    previousQuestionOrder
  } = props

  // [STATE HOOKS]

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()
  const answersContext = useAnswersContext()

  const [{ height }, ref] = useSize()
  const [{ height: buttonsHeight }, buttonsRef] = useSize()
  const handleSmallScreen = useMedia({ minWidth: '900px' })

  // [CLEAN FUNCTIONS]
  const onCurrentSlideChange = (slideIndex) => {
    const containWelcomeScreen = questionsData?.some(
      (question) => question?.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )

    setCurrentSlide(containWelcomeScreen ? slideIndex : slideIndex + 1)
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
  let currentSlideData = questionsData?.filter(
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
      ? questionsData?.filter(
          (item) => item.id === questionConfig[0]?.redirectQuestion
        )[0]?.order
      : 0

    ;(nextOrder && goTo(nextOrder)) || next()
  }
  // const textSlideNextNumber = () => {
  //   goTo()
  // }
  // const specialSlideNextNumber = () => {
  //   goTo()
  // }

  isAnswered && choiceSlideNextNumber()

  return (
    <Box onWheel={handleScroll} height="100%" ref={ref} width="100%">
      <AntdCarousel
        dots={false}
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
        {handleSmallScreen ? (
          !submitLoading && (
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
          )
        ) : (
          <PromptBox mb={3}>
            <DoubleRightOutlined />
            <SecondIcon />
          </PromptBox>
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
