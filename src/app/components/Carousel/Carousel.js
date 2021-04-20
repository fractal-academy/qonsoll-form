import './Carousel.styles.css'
import PropTypes from 'prop-types'
import { Button } from 'app/components'
import { Carousel as AntdCarousel } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

function Carousel(props) {
  const { children, isAnswered, setIsAnswered } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()

  // [CLEAN FUNCTIONS]
  const handleScroll = (e) => {
    e.deltaY > 0 ? next() : previous()
  }
  const next = () => {
    carouselRef.current?.next()
    setIsAnswered(false)
  }
  const previous = () => {
    carouselRef.current?.prev()
  }

  //COMPUTED PROPERTIES
  isAnswered && next()

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Box onWheel={handleScroll}>
      <AntdCarousel dots={false} ref={carouselRef} dotPosition="right">
        {children}
      </AntdCarousel>

      <Row h="right">
        <Col cw="auto" mt={4}>
          <Button buttonType="primary" className="buttonGroup">
            Powered by<b> Qonsoll</b>
          </Button>
          <Button
            buttonType="primary"
            className="buttonGroup"
            onClick={previous}>
            <UpOutlined />
          </Button>
          <Button buttonType="primary" className="buttonGroup" onClick={next}>
            <DownOutlined />
          </Button>
        </Col>
      </Row>
    </Box>
  )
}

Carousel.propTypes = {
  children: PropTypes.node
}

export default Carousel
