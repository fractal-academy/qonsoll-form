import React, { useEffect, useState } from 'react'
import { Carousel as AntdCarousel, Button } from 'antd'
import { Box } from '@qonsoll/react-design'
import { useScroll } from '@umijs/hooks'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function Carousel(props) {
  const { children } = props

  console.log(children)
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const [scroll] = useScroll(document)

  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]

  // [USE_EFFECTS]
  useEffect(() => {
    console.log(scroll)
  }, [scroll])

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

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }

  return (
    <>
      <AntdCarousel dotPosition="right">{children}</AntdCarousel>
      <Button.Group>
        <Button type="primary">Prev</Button>
        <Button type="primary">Next</Button>
      </Button.Group>
    </>
  )
}

Carousel.propTypes = {}

export default Carousel
