import { Form, Grid, message } from 'antd'
import { Input, Typography } from 'antd'
import React, { useRef } from 'react'

import PropTypes from 'prop-types'
import { SubmitButton } from '../../components'
import { useKeyPress } from '@umijs/hooks'
import { useTranslations } from '@qonsoll/translation'

const { useBreakpoint } = Grid
const { Text } = Typography
const { TextArea } = Input

function LongText(props) {
  const { textAreaProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslations()
  const { xl } = useBreakpoint()
  const textAreaRef = useRef()

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
    textAreaRef.current.blur()
  }
  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo)
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

  const onFocusedKeyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      //Prevent line break on Enter press
      e.preventDefault()
    }
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ width: '100%' }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="answer" rules={[{ required: question?.isRequired }]}>
          <TextArea
            bordered
            maxLength={1000}
            ref={textAreaRef}
            {...textAreaProps}
            disabled={!onClick}
            onPressEnter={onFocusedKeyPress}
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder={`${t('Type your answer here')}...`}
          />
        </Form.Item>

        {xl && (
          <Text type="secondary" mt="4px">
            {t('Shift ⇧ + Enter ↵ to make a line break')}
          </Text>
        )}
      </Form>
      <div mt="24px">
        <SubmitButton onClick={onPressOk} disablePressEnter />
      </div>
    </div>
  )
}

LongText.propTypes = {
  textAreaProps: PropTypes.object,
  onClick: PropTypes.func,
  question: PropTypes.object,
  currentSlide: PropTypes.number
}

export default LongText
