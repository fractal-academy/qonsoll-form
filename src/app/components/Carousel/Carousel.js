import { useRef } from 'react'
import './Carousel.styles.css'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { Carousel as AntdCarousel } from 'antd'
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
    setIsAnswered && setIsAnswered(false)
  }
  const previous = () => {
    carouselRef.current?.prev()
  }
  const goTo = (slideNumber) => {
    carouselRef.current?.goTo(slideNumber)
  }

  //COMPUTED PROPERTIES
  isAnswered && next()

  return (
    <Box onWheel={handleScroll} width="100%">
      <AntdCarousel ref={carouselRef} dotPosition="right" dots={false}>
        {children}
      </AntdCarousel>

      <Row h="right">
        <Col cw="auto" mt={4}>
          <Button buttonType="primary" className="buttonGroup">
            Powered by<b> Qonsoll</b>
          </Button>
          <Button
            buttonType="primary"
            onClick={previous}
            className="buttonGroup">
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
