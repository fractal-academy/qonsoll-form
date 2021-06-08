import { Button } from 'antd'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Box } from '@qonsoll/react-design'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { CustomCarousel } from './Carousel.style'

function Carousel(props) {
  const {
    children,
    isAnswered,
    setIsAnswered,
    setCurrentSlide,
    submitLoading
  } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()

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
  // const goTo = (slideNumber) => {
  //   carouselRef.current?.goTo(slideNumber)
  // }

  //COMPUTED PROPERTIES
  isAnswered && next()

  return (
    <Box onWheel={handleScroll} height="100%" width="100%">
      <CustomCarousel
        dots={false}
        ref={carouselRef}
        dotPosition="right"
        dots={false}
        afterChange={onCurrentSlideChange}>
        {children}
      </CustomCarousel>
      {!submitLoading && (
        <Row h="right" m={2} noGutters>
          <Col cw="auto" mr={2}>
            <Button type="primary" onClick={previous}>
              <UpOutlined />
            </Button>
          </Col>
          <Col cw="auto">
            <Button type="primary" onClick={next}>
              <DownOutlined />
            </Button>
          </Col>
        </Row>
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
