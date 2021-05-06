import { useState } from 'react'
import { Typography, Input } from 'antd'
import { ImageUploader } from 'components'
import { styles } from './ChoiceInput.styles'
import { Row, Col, Box } from '@qonsoll/react-design'

const { Text } = Typography
const { TextArea } = Input

function ChoiceInput(props) {
  const { index, data, withImage } = props

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data.value)

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
