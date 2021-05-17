import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import { Typography, Input } from 'antd'
import { styles } from './ChoiceInput.styles'
import { DEFAULT_IMAGE } from 'app/constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
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
  const bgImage = `url(${data?.image || DEFAULT_IMAGE})`

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    //if the value has not changed do nothing, reduce the number of queries to the database
    if (choiceProps[index].name === value) return
    // update the choice we need
    choiceProps[index].name = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  const onDelete = async () => {
    //remove item from array with 'index' position,
    //'1' - amount of deleted elements from index position till the end(check how splice works for details)
    choiceProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  const onMediaModalContinue = (selectedImage) => {
    choiceProps[index].image = selectedImage
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setValue(data?.name)
  }, [data])

  return (
    <Box
      bg="#d6e1f2"
      borderRadius={theme.borderRadius.md}
      p={2}
      m={1}
      width={withImage ? 'auto' : '150px'}
      position="relative">
      {withImage && (
        <Box
          height="100px"
          borderRadius={theme.borderRadius.md}
          position="relative"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage={bgImage}>
          <MediaLibraryModal
            btnProps={{
              type: 'primary',
              icon: <EditOutlined style={styles.btnStyle} />
            }}
            onContinue={onMediaModalContinue}
          />
        </Box>
      )}
      <Row pt={withImage && 2} noGutters>
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
        <CloseOutlined />
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
