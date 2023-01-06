import { Box, Container, Input } from '@qonsoll/react-design'
import { Form, message } from 'antd'
import React, { useRef } from 'react'

import PropTypes from 'prop-types'
import { SubmitButton } from '../../components'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

function ShortText(props) {
  const { inputProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const inputRef = useRef()
  const [form] = Form.useForm()
  const { t } = useTranslations()

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
    // eslint-disable-next-line no-console
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
      message.error(t('The answer is required'))
    } else {
      form.submit()
    }
  }

  return (
    <Container>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ width: '100%' }}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="answer" rules={[{ required: question?.isRequired }]}>
          <Input
            {...inputProps}
            ref={inputRef}
            maxLength={250}
            placeholder={`${t('Type your answer here')}...`}
            onPressEnter={onFocusedKeyPress}
            disabled={!onClick}
          />
        </Form.Item>
      </Form>
      <Box mt="24px">
        <SubmitButton onClick={onPressOk} disablePressEnter />
      </Box>
    </Container>
  )
}

ShortText.propTypes = {
  inputProps: PropTypes.object,
  onClick: PropTypes.func,
  question: PropTypes.object,
  currentSlide: PropTypes.number
}

export default ShortText
