import { Form } from 'antd'
import React, { useMemo } from 'react'
import { TEXTINGS } from '../../../../constants'
import { TextArea, Input, Switch } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'

// const { TextArea } = Input
function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { formTitlePlaceholder, formSubtitlePlaceholder, quizSwitcherText } =
    useTranslation()

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
        rules={[{ required: true, message: 'Please, enter form name.' }]}>
        <Input
          mb={4}
          allowClear
          placeholder={formTitlePlaceholder || TEXTINGS.formTitlePlaceholder}
        />
      </Form.Item>
      <Form.Item name="subtitle">
        <TextArea
          mb={4}
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={
            formSubtitlePlaceholder || TEXTINGS.formSubtitlePlaceholder
          }
        />
      </Form.Item>
      <Form.Item
        name="isQuiz"
        label={quizSwitcherText || TEXTINGS.quizSwitcherText}>
        <Switch defaultChecked={!!formData?.isQuiz} />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
