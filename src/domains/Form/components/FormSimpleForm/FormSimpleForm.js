import React from 'react'
import { Form, Input } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import TextArea from 'antd/es/input/TextArea'

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
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={t("Form short description")}
        />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
