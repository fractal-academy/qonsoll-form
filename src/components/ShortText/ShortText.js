import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { globalStyles } from '../../../styles'
import { SubmitButton } from '../../components'
import { Row, Col, Container } from '@qonsoll/react-design'
import { useTranslation } from '../../context/Translation'

function ShortText(props) {
  const { inputProps, isRequired, onClick, id,question } = props

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

  return (
    <Form
      style={{ width: '70%' }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Container>
        <Row noGutters>
          <Col display="block">
            <Form.Item
              style={globalStyles.resetMarginB}
              name="answer"
              rules={[{ required: isRequired }]}>
              <Input
                {...inputProps}
                placeholder={`${t('Type your answer here')}...`}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row mt={4} noGutters>
          <Col cw="auto">
            <SubmitButton onClick={() => form.submit()} />
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

ShortText.propTypes = {
  onSubmit: PropTypes.func,
  isRequired: PropTypes.bool,
  btnProps: PropTypes.object,
  inputProps: PropTypes.object
}

export default ShortText
