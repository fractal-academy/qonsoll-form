import React, { useEffect, useState } from 'react'
import { Col, Row } from '@qonsoll/react-design'
import { InputNumber, Slider } from 'antd'
import { styles } from './RangeSlider.styles'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function RangeSlider(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(0)

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onSlide = (value) => {
    setInputValue(value)
  }
  const value = typeof inputValue === 'number' ? inputValue : 0

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
  // const { inputValue } = this.state
  return (
    <Row>
      <Col px={3}>
        <Slider min={-50} max={50} onChange={onSlide} value={value} />
      </Col>
      <Col cw="auto">
        <InputNumber
          min={-50}
          max={50}
          style={styles.InputNumber}
          value={inputValue}
          onChange={onSlide}
        />
      </Col>
    </Row>
  )
}

RangeSlider.propTypes = {}

export default RangeSlider
