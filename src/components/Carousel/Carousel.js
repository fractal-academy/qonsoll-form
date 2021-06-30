import PropTypes from 'prop-types'
import { useSize } from '@umijs/hooks'
import React, { cloneElement, useRef, useState, useEffect } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Carousel as AntdCarousel } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { useAnswersContext } from '../../context/Answers'

function Carousel(props) {
  const {
    children,
    isAnswered,
    setIsAnswered,
    currentSlide,
    setCurrentSlide,
    submitLoading,
    disabledDown,
    disabledUp
  } = props

  // [STATE HOOKS]
  // const [previousQuestion, setPreviousQuestion] = useState(0)

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()
  const answersContext = useAnswersContext()

  const [{ height }, ref] = useSize()
  const [{ height: buttonsHeight }, buttonsRef] = useSize()

  // [CLEAN FUNCTIONS]
  const handleScroll = (e) => {
    // return this after adding isRequired and condition rules
    // e.deltaY > 0 ? next() : previous()
  }
  const next = () => {
    carouselRef.current?.next()
    setIsAnswered && setIsAnswered(false)
  }
  const previous = () => {
    carouselRef.current?.prev()
  }
  const onCurrentSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }
  //For logic jumps
  const goTo = (slideNumber) => {
    carouselRef.current?.goTo(slideNumber)
  }

  //COMPUTED PROPERTIES
  let currentNodeSlide = children?.filter(
    (child) => child?.props?.item?.order === currentSlide
  )
  let slide = currentNodeSlide[0]?.props?.item

  let givenAnswerObject = Object.fromEntries(
    Object.entries(answersContext).filter(([key, value]) => key === slide.id)
  )
  let answer = Object.entries(givenAnswerObject)[0]
  let answerValue = answer && answer[1].answer.value

  let nextQuestionOrder = slide.questionConfigurations.filter(
    (item) => item.answerOption === answerValue
  )

  // console.log('slide: ', slide.questionConfigurations)
  // console.log('answer : ', answerValue)
  console.log('result: ', nextQuestionOrder)
  //default route
  isAnswered && next()

  return (
    <Box onWheel={handleScroll} height="100%" ref={ref} width="100%">
      <AntdCarousel
        dots={false}
        adaptiveHeight
        ref={carouselRef}
        dotPosition="right"
        afterChange={onCurrentSlideChange}
        infinite={false}
        speed={1500}>
        {children.map((el, index) =>
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
