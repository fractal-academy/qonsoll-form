import React, { useEffect, useRef } from 'react'
import { Form, Input, message } from 'antd'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../styles'
import { SubmitButton } from '../../components'
import { Box, Container } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'
import { useKeyPress } from '@umijs/hooks'

function ShortText(props) {
  const { inputProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { answerRequiredMessageError, shortTextInputPlaceholder } =
    useTranslation()
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
      //Prevent linebrake onEnter

      e.preventDefault()
    }
  }

  const onPressOk = () => {
    //get values from form to check if there is any answer data
    //.trim() removes all useless spaces to prevent submit with only spaces
    const value = form.getFieldsValue()?.answer?.trim()
    //if required and empty answer - error message, else form submit and set data to context
    if (question?.isRequired && !value) {
      message.error(
        answerRequiredMessageError || 'It`s required question, please answer'
      )
    } else {
      form.submit()
    }
  }

  useEffect(
    () =>
      //when question was skipped by navigation buttons and input was focused - reset focus
      currentSlide === question?.order && inputRef?.current
        ? inputRef?.current?.focus?.()
        : inputRef?.current?.blur?.(),
    [currentSlide]
  )
  return (
    <Container>
      <Form
        style={{ width: '100%' }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          style={globalStyles.resetMarginB}
          name="answer"
          rules={[{ required: question?.isRequired }]}>
          <Input
            {...inputProps}
            ref={inputRef}
            maxLength={300}
            placeholder={
              shortTextInputPlaceholder || 'Type your answer here...'
            }
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
