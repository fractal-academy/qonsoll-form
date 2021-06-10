import { Button, Carousel as AntdCarousel } from 'antd'
import PropTypes from 'prop-types'
import React, { cloneElement, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { CustomCarousel } from 'components/Carousel/Carousel.style'
import { useSize } from '@umijs/hooks'

function Carousel(props) {
  const { children, isAnswered, setIsAnswered, setCurrentSlide } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()

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
  // const goTo = (slideNumber) => {
  //   carouselRef.current?.goTo(slideNumber)
  // }

  //COMPUTED PROPERTIES
  isAnswered && next()

  return (
    <Box onWheel={handleScroll} height="100%" ref={ref} width="100%">
      <AntdCarousel
        dots={false}
        ref={carouselRef}
        dotPosition="right"
        afterChange={onCurrentSlideChange}>
        {/*{cloneElement(children, { wrapperHeight: height })}*/}
        {children.map((el) =>
          cloneElement(el, { wrapperHeight: height - buttonsHeight })
        )}
      </AntdCarousel>

      <Box ref={buttonsRef}>
        <Row h="right" p={2} noGutters>
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
