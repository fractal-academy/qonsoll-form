import React from 'react'
import PropTypes from 'prop-types'
import { Form, Typography, Input, message } from 'antd'
import { SubmitButton } from '../../components'
import { Container } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'
import { useKeyPress } from '@umijs/hooks'
import { globalStyles } from '../../../styles'

const { TextArea } = Input

function LongText(props) {
  const { textAreaProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslation()
  useKeyPress(
    (e) =>
      //if pressed enter without shift and this event on this question slide - dispatch second callback
      e.keyCode === 13 && !e.shiftKey && currentSlide === question?.order,
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
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // [COMPUTED_PROPERTIES]
  const explanation = t('Shift ⇧ + Enter ↵ to make a line break')

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

  const onFocusedKeyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      //Prevent linebrake onEnter
      e.preventDefault()
    }
  }

  return (
    <Container>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '100%' }}>
        <Form.Item
          style={globalStyles.resetMarginB}
          name="answer"
          rules={[{ required: question?.isRequired }]}>
          <TextArea
            {...textAreaProps}
            bordered
            maxLength={1000}
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder="Type your answer here..."
            onPressEnter={onFocusedKeyPress}
            disabled={!onClick}
          />
        </Form.Item>
        <Form.Item>
          <Typography>{explanation}</Typography>
        </Form.Item>
      </Form>

      {/* <SubmitButton /> */}
      <SubmitButton onClick={onPressOk} disablePressEnter />
    </Container>
  )
}

LongText.propTypes = {
  textAreaProps: PropTypes.object,
  onClick: PropTypes.func
}

export default LongText
