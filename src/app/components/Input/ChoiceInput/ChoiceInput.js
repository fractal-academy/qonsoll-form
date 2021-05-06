import { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Input } from 'antd'
import { ImageUploader } from 'components'
import { styles } from './ChoiceInput.styles'
import { CloseOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'

const { Text } = Typography
const { TextArea } = Input

let startLetter = 65

function ChoiceInput(props) {
  const { index, data, withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data?.name)

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.btnProps
  const letter = String.fromCharCode(startLetter + index)

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    if (choiceProps[index].name === value) return

    choiceProps[index].name = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  const onDelete = async () => {
    choiceProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }

  return (
    <Box
      bg="#d6e1f2"
      p={2}
      borderRadius="8px"
      m={1}
      width={withImage ? 'auto' : '150px'}
      position="relative">
      {withImage && (
        <Row>
          <Col cw="auto">
            <ImageUploader />
          </Col>
        </Row>
      )}
      <Row pt={withImage && 2}>
        <Col cw="auto" pt={1}>
          <Text style={styles.keyLetterStyles}>{letter}</Text>
        </Col>
        <Col cw="auto" width={withImage ? '130px' : '100px'}>
          <TextArea
            value={value}
            onBlur={onBlur}
            placeholder={`choice ${index}`}
            autoSize={{ minRows: 1, maxRows: 6 }}
            bordered={false}
            style={styles.textAreaStyles}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Box
        height="16px"
        width="16px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        style={styles.deleteBtnStyles}
        onClick={onDelete}>
        <CloseOutlined style={styles.deleteIconStyles} />
      </Box>
    </Box>
  )
}

ChoiceInput.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  withImage: PropTypes.bool
}

export default ChoiceInput
