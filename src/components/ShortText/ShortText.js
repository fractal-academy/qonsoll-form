import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Form, message } from 'antd'
import { TEXTINGS } from '../../constants'
import { useKeyPress } from '@umijs/hooks'
import { SubmitButton } from '../../components'
import { Box, Container, Input } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'

function ShortText(props) {
  const { inputProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { requiredAnswerMessage, textQuestionPlaceholder } = useTranslation()
  const inputRef = useRef()

  useKeyPress(
    (e) =>
      //if pressed enter this event on this question slide - dispatch second callback
      e.keyCode === 13 && currentSlide === question?.order,
    (e) => {
      if (e.type === 'keyup') {
        onPressOk()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onFinish = ({ answer }) => {
    const data = { question, answer: { value: answer || '' } }
    onClick && onClick(data)
    inputRef.current.blur()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFocusedKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Prevent line brake onEnter
      e.preventDefault()
    }
  }

  const onPressOk = () => {
    //get values from form to check if there is any answer data
    //.trim() removes all useless spaces to prevent submit with only spaces
    const value = form.getFieldsValue()?.answer?.trim()
    //if required and empty answer - error message, else form submit and set data to context
    if (question?.isRequired && !value) {
      message.error(requiredAnswerMessage || TEXTINGS.requiredAnswerMessage)
    } else {
      form.submit()
    }
  }

  // THIS CODE ruining form on form view from android devices (inputs grab focus even on blur) - work fine on iPhones and MiBrowser
  // useEffect(
  //   () =>
  //     //when question was skipped by navigation buttons and input was focused - reset focus
  //     currentSlide === question?.order && inputRef?.current
  //       ? inputRef?.current?.focus?.()
  //       : inputRef?.current?.blur?.(),
  //   [currentSlide]
  // )
  // THIS CODE ruining form on form view from android devices (inputs grab focus even on blur) - work fine on iPhones and MiBrowser

  return (
    <Container>
      <Form
        style={{ width: '100%' }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="answer" rules={[{ required: question?.isRequired }]}>
          <Input
            {...inputProps}
            ref={inputRef}
            maxLength={300}
            placeholder={`${
              textQuestionPlaceholder || TEXTINGS.textQuestionPlaceholder
            }...`}
            onPressEnter={onFocusedKeyPress}
            disabled={!onClick}
          />
        </Form.Item>
      </Form>
      <Box mt={4}>
        <SubmitButton onClick={onPressOk} disablePressEnter />
      </Box>
    </Container>
  )
}

ShortText.propTypes = {
  onSubmit: PropTypes.func,
  isRequired: PropTypes.bool,
  btnProps: PropTypes.object
}

export default ShortText
