import React from 'react'
import PropTypes from 'prop-types'
import { Form, Typography, Input } from 'antd'
import { SubmitButton } from '../../components'
import { Col, Container, Row } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'

const { TextArea } = Input

function LongText(props) {
  const { textAreaProps, onClick, question } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslation()

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

  return (
    <Container>
      <Row noGutters>
        <Col d="block">
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: '70%' }}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              name="answer"
              rules={[
                {
                  required: true
                }
              ]}>
              <TextArea
                bordered
                autoSize={{ minRows: 1, maxRows: 4 }}
                placeholder={`${t('Type your answer here')}...`}
                {...textAreaProps}
              />
            </Form.Item>
            <Form.Item>
              <Typography>{explanation}</Typography>
            </Form.Item>
            <SubmitButton onClick={() => form.submit()} />
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

LongText.propTypes = {
  textAreaProps: PropTypes.object,
  onClick: PropTypes.func
}

export default LongText
