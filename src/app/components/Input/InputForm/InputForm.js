import React, { useEffect, useState } from 'react'
import { Form, Typography } from 'antd'
import { Row, Col, Container } from '@qonsoll/react-design'
import { Input, Button, SubmitButton } from 'components'
// import { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import { styles } from './InputForm.styles'
import { globalStyles } from 'app/styles'

const { Text, Title } = Typography
// import { useTranslation } from 'react-i18next'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function InputForm(props) {
  const { onSubmit, inputProps, isRequired, onClick, btnProps } = props
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
        <Row noGutters>
          <Col>
            <Form.Item
              style={globalStyles.resetMarginB}
              name="input"
              rules={[{ required: isRequired }]}>
              <Input
                {...inputProps}
                placeholder="Type your answer here..."
                style={styles.inputStyle}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //TODO:REPLACE ON CUSTOM SUBMIT BUTTON */}
        <Row mt={24}>
          <Col cw="auto">
            <SubmitButton onClick={onClick} />
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
