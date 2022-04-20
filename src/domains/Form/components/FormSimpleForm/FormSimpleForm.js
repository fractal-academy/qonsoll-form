import { Input, Switch, TextArea } from '@qonsoll/react-design'
import React, { useMemo } from 'react'

import { Form } from 'antd'
import { useTranslations } from '@qonsoll/translation'

// const { TextArea } = Input
function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [COMPUTED PROPERTIES]
  const initialValues = useMemo(() => {
    const { title, subtitle = '', isQuiz = false } = formData || {}
    return {
      title,
      subtitle,
      isQuiz
    }
  }, [formData])

  return (
    <Form {...rest} initialValues={initialValues}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: t('Please, enter form name') }]}>
        <Input mb={4} allowClear maxLength={250} placeholder={t('Form name')} />
      </Form.Item>
      <Form.Item name="subtitle">
        <TextArea
          mb={4}
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={t('Form short description')}
        />
      </Form.Item>
      <Form.Item name="isQuiz" label={t('Enable quiz system')}>
        <Switch defaultChecked={!!formData?.isQuiz} />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
