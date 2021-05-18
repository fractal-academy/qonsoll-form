import PropTypes from 'prop-types'
import { Form, Typography, Input } from 'antd'
import { SubmitButton } from 'components'
import { Col, Container, Row } from '@qonsoll/react-design'

const { TextArea } = Input

function LongText(props) {
  const { textAreaProps, onClick } = props

  // [ADDITIONAL HOOKS]
  const { form } = Form.useForm()

  // [CLEAN FUNCTIONS]
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Container>
      <Row noGutters>
        <Col>
          <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                placeholder="Type your answer here..."
                {...textAreaProps}
              />
            </Form.Item>
            <Form.Item>
              <Typography>Shift ⇧ + Enter ↵ to make a line break</Typography>
            </Form.Item>
            <SubmitButton onClick={onClick} />
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
