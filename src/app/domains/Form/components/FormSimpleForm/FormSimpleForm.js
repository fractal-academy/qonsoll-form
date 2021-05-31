import React from 'react'
import { Form, Input } from 'antd'
import { Col, Row } from '@qonsoll/react-design'

function FormSimpleForm(props) {
  const { onFinish, form, formData, children } = props
  // [COMPUTED PROPERTIES]
  const initialValues = {
    name: formData?.title,
    description: formData?.subtitle
  }

  return (
    <Form onFinish={onFinish} form={form} initialValues={initialValues}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input allowClear placeholder="Type form name" />
      </Form.Item>
      <Form.Item name="description">
        <Input allowClear placeholder="Form short description" />
      </Form.Item>
      {children && <Col cw={12}>{children}</Col>}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
