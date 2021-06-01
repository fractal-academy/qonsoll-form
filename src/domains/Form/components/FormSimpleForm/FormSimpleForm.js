import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from '../../../../context/Translation'

function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslation()

  // [COMPUTED PROPERTIES]
  const initialValues = {
    name: formData?.title,
    description: formData?.subtitle
  }

  return (
    <Form {...rest} initialValues={initialValues}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input allowClear placeholder={t('Type form name')} />
      </Form.Item>
      <Form.Item name="description">
        <Input allowClear placeholder={t('Form short description')} />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
