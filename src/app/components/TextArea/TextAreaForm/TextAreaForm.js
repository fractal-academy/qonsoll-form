import React, { useEffect, useState } from 'react'
import { TextArea } from 'components'
import { Button, Form, Typography } from 'antd'
import { Col, Container, Row } from '@qonsoll/react-design'
import Text from 'antd/lib/typography/Text'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function TextAreaForm(props) {
  const { onSubmit, textAreaProps, btnProps, noBorder, longText } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const { form } = Form.useForm()
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const onFinish = (values) => {
    console.log('Success:', values)
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
    <>
      <Container>
        <Row noGutters>
          <Col>
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                style={{ marginBottom: '0px' }}
                name="answer"
                rules={[
                  {
                    required: true
                  }
                ]}>
                <TextArea {...textAreaProps} />
              </Form.Item>
              <Form.Item>
                <Typography>Shift ⇧ + Enter ↵ to make a line break</Typography>
              </Form.Item>
              <Button
                size={'large'}
                style={{
                  borderRadius: '4px',
                  marginRight: '4px',
                  fontWeight: 'bold'
                }}
                key="submit"
                onClick={() => form.submit()}
                {...btnProps}
              />
              <Text>Press enter ↵</Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

TextAreaForm.propTypes = {
  textAreaProps: PropTypes.object,
  btnProps: PropTypes.object,
  noBorder: PropTypes.bool,
  longText: PropTypes.bool
}

export default TextAreaForm
