import React, { useEffect, useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { ImageUploader } from 'components'
import { PlusOutlined } from '@ant-design/icons'
import { styles } from './ChoiceInput.styles'

// import { useTranslation } from 'react-i18next'
const { Text } = Typography
const { TextArea } = Input

function ChoiceInput(props) {
  const { index, data, withImage } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data.value)
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
    <Box
      bg="#d6e1f2"
      p={2}
      borderRadius="8px"
      m={1}
      width={withImage ? 'auto' : '150px'}>
      {withImage && (
        <Row>
          <Col cw="auto">
            <ImageUploader />
          </Col>
        </Row>
      )}
      <Row pt={withImage && 2}>
        <Col cw="auto" pt={1}>
          <Text style={styles.keyLetterStyles}>
            {String.fromCharCode(data.keyLetter)}
          </Text>
        </Col>
        <Col cw="auto" width={withImage ? '130px' : '100px'}>
          <TextArea
            value={value}
            placeholder={`choice ${index}`}
            autoSize={{ minRows: 1, maxRows: 6 }}
            bordered={false}
            style={styles.textAreaStyles}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
        </Col>
      </Row>
    </Box>
  )
}

ChoiceInput.propTypes = {}

export default ChoiceInput
