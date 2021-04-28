import React, { useEffect, useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { ImageUploader } from 'components'
import { CloseOutlined } from '@ant-design/icons'
import { styles } from './ChoiceInput.styles'
import {
  DISPATCH_EVENTS,
  useFormContext,
  useFormContextDispatch
} from 'app/context/FormContext'
import { setData } from '~/app/services/Firestore'
import { COLLECTIONS } from '~/app/constants'
import { globalStyles } from '~/app/styles'

// import { useTranslation } from 'react-i18next'
const { Text } = Typography
const { TextArea } = Input

let startLetter = 65

function ChoiceInput(props) {
  const { index, data, withImage } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t
  const currentQuestion = useFormContext()
  const dispatch = useFormContextDispatch()
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
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, currentQuestion)
  }
  const onDelete = async () => {
    choiceProps.splice(index, 1)
    dispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
    await setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, currentQuestion)
  }
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

ChoiceInput.propTypes = {}

export default ChoiceInput
