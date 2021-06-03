import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { SubmitButton } from 'components'
import { Row, Col, Container } from '@qonsoll/react-design'

function ShortText(props) {
  const { onSubmit, inputProps, isRequired, onClick, id } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()

  // [CLEAN FUNCTIONS]
  const onFinish = ({ answer }) => {
    const data = { questionId: id, answer }
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
              <Input {...inputProps} placeholder="Type your answer here..." />
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
