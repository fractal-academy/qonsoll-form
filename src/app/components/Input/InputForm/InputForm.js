import React, { useEffect, useState } from 'react'
import { Button, Form, Typography } from 'antd'
import { Row, Col, Container } from '@qonsoll/react-design'
import { Input } from 'components'
// import { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

const { Text, Title } = Typography
// import { useTranslation } from 'react-i18next'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function InputForm(props) {
  const { onSubmit, inputProps, isRequired, btnProps } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onFinish = (values) => {
    console.log('Success:', values)
    onSubmit && onSubmit(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Container>
        <Row>
          <Col>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="input"
              rules={[{ required: isRequired }]}>
              <Input {...inputProps} />
            </Form.Item>
          </Col>
        </Row>
        {/* //TODO:REPLACE ON CUSTOM SUBMIT BUTTON */}
        <Row mt={24}>
          <Col cw="auto">
            <Button onClick={() => form.submit()} {...btnProps} />
          </Col>
          <Col cw="auto" v="center" ml={10}>
            <Text>Press enter ↵</Text>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

InputForm.propTypes = {
  onSubmit: PropTypes.func,
  isRequired: PropTypes.bool,
  btnProps: PropTypes.object,
  inputProps: PropTypes.object
}

export default InputForm
