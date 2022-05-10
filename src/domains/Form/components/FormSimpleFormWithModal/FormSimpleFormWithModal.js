import { Button, Title } from '@qonsoll/react-design'
import { Form, Modal } from 'antd'
import React, { useState } from 'react'

import { FormSimpleForm } from '../../../../domains/Form/components'
import { useTranslations } from '@qonsoll/translation'

const FormSimpleFormWithModal = (props) => {
  const {
    formData,
    setEdit,
    isModalVisible,
    setIsModalVisible,
    onModalSubmit,
    isEdit,
    children
  } = props

  // [STATE]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslations()

  // [HELPER_FUNCTIONS]
  const handleCancel = async () => {
    await setLoading(false)
    await setIsModalVisible(false)
    form.resetFields()
  }
  const onFormEdit = (data) => {
    setLoading(true)
    onModalSubmit(data)
    !isEdit && form.resetFields()
    setLoading(false)
    setIsModalVisible(false)
    setEdit?.(isEdit)
  }
  // [COMPUTED PROPERTIES]

  return (
    <Modal
      title={
        <Title
          color="var(--qf-typography-title-color)"
          fontFamily="var(--ql-font-family-main)"
          level={4}>
          {isEdit ? t('Edit form') : t('Create new form')}
        </Title>
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          onClick={() => {
            handleCancel()
          }}>
          Cancel
        </Button>,
        <Button onClick={() => form.submit()} type="primary" loading={loading}>
          {isEdit ? t('Save changes') : t('Create form')}
        </Button>
      ]}>
      <FormSimpleForm
        form={form}
        formData={formData}
        children={children}
        onFinish={onFormEdit}
      />
    </Modal>
  )
}

export default FormSimpleFormWithModal
