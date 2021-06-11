import { Button, Carousel as AntdCarousel } from 'antd'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

function Carousel(props) {
  const { children, isAnswered, setIsAnswered, setCurrentSlide } = props

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
      <AntdCarousel
        dots={false}
        adaptiveHeight
        ref={carouselRef}
        dotPosition="right"
        afterChange={onCurrentSlideChange}
        infinite={false}>
        {children}
      </AntdCarousel>

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
