import React from 'react'
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
  const { t } = useTranslation()
  useKeyPress(
    (e) =>
      //if pressed enter this event on this question slide - dispatch second callback
      e.keyCode === 13 && currentSlide === question?.order,
    (e) => {
      if (e.type === 'keyup') {
        console.log('shrt')
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
    question?.isRequired
      ? !!value
        ? form.submit()
        : message.error('It`s required question, please answer')
      : form.submit()
  }

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
            placeholder="Type your answer here..."
            onPressEnter={onFocusedKeyPress}
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
  btnProps: PropTypes.object,
  inputProps: PropTypes.object
}

export default ShortText
