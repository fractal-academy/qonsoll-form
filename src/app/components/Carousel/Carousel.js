import PropTypes from 'prop-types'
import { useScroll } from '@umijs/hooks'
import React, { useEffect, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Carousel as AntdCarousel, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'

function Carousel(props) {
  const { children } = props

  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const [scroll, ref] = useScroll(document)
  console.log(scroll.top)

  const carouselRef = useRef()
  const next = () => {
    carouselRef.current?.next()
  }
  const previous = () => {
    carouselRef.current?.prev()
  }
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

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
    <Box ref={ref}>
      <AntdCarousel dots={false} ref={carouselRef} dotPosition="right">
        {children}
      </AntdCarousel>

      <Row h="right">
        <Col cw="auto">
          <Button.Group>
            <Button type="primary">
              Powered by<b> Typeform</b>
            </Button>
            <Button type="primary" onClick={previous}>
              <UpOutlined />
            </Button>
            <Button type="primary" onClick={next}>
              <DownOutlined />
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </Box>
  )
}

Carousel.propTypes = {
  children: PropTypes.node
}

export default Carousel
