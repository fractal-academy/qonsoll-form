import React, { useMemo } from 'react'
import { Form, Input, Switch } from 'antd'
import { useTranslation } from '../../../../context/Translation'
import { Col } from '@qonsoll/react-design'

const { TextArea } = Input
function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { formNamePlaceholder, formDescriptionPlaceholder } = useTranslation()

  // [COMPUTED PROPERTIES]
  const initialValues = useMemo(() => {
    const { title, subtitle = '', isQuiz = false } = formData || {}
    return {
      isQuiz,
      title,
      subtitle
    }
  }, [formData])

  return (
    <Form {...rest} initialValues={initialValues}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input
          allowClear
          placeholder={formNamePlaceholder || 'Type form name'}
        />
      </Form.Item>
      <Form.Item name="subtitle">
        <TextArea
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={formDescriptionPlaceholder || 'Form short description'}
        />
      </Form.Item>
      <Form.Item name="isQuiz" label="Enable quiz system">
        <Switch />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
