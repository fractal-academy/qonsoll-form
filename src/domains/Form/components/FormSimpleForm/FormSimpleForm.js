import { Col, Input, Row, Text, TextArea } from '@qonsoll/react-design'
import React, { useMemo } from 'react'

import { Checkbox } from 'antd'
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
      <Row noGutters>
        <Col cw={12}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: t('Please, enter form name') }]}>
            <Input allowClear maxLength={100} placeholder={t('Form name')} />
          </Form.Item>
        </Col>

        <Col cw={12}>
          <Form.Item name="subtitle">
            <TextArea
              showCount
              autoSize={{ minRows: 5 }}
              maxLength={250}
              allowClear
              placeholder={t('Form short description')}
            />
          </Form.Item>
        </Col>

        <Col cw={12}>
          <Form.Item name="isQuiz" valuePropName="checked">
            <Checkbox
              defaultChecked={initialValues?.isQuiz}
              data-testproject="quizSystem">
              <Text>{t('Enable quiz system')}</Text>
            </Checkbox>
            {/* <Switch defaultChecked={!!formData?.isQuiz} /> */}
          </Form.Item>
        </Col>

        <Col cw={12}>{children}</Col>
      </Row>
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
